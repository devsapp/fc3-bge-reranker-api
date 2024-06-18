'use strict';
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const downloads = require('@serverless-devs/downloads').default;


async function getFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    stream.on('data', (chunk) => {
      hash.update(chunk);
    });
    stream.on('end', () => {
      const fileHash = hash.digest('hex');
      resolve(fileHash);
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
}
async function copyDirectory(sourceDir, targetDir) {
  await fs.promises.mkdir(targetDir, { recursive: true });
  const files = await fs.promises.readdir(sourceDir, { withFileTypes: true });

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file.name);
    const targetPath = path.join(targetDir, file.name);
    if (file.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath)
    }
  }
}
function listAllFiles(dirPath) {
  const readDirSync = (dir) => {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (let entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isFile()) {
        console.log(fullPath);
      }
      else if (entry.isDirectory()) {
        files = files.concat(readDirSync(fullPath));
      }
    }

    return files;
  };

  readDirSync(dirPath);
}


exports.handler = async (_event, _context, callback) => {
  const hashTag = process.env.MODEL_FILE_HASH || 'd9e3e081faff1eefb84019509b2f5558fd74c1a05a2c7db22f74174fcedb5286';
  const region = process.env.region || 'cn-hangzhou';
  const download_path = process.env.download_path || '/mnt/embedding-download'
  const embedding_model_name = process.env.EMBEDDING_MODEL_NAME || 'bge-reranker-v2-m3'
  const fileUrl = `https://serverless-ai-models-${region}.oss-${region}-internal.aliyuncs.com/${embedding_model_name}/model.safetensors`;
  const filename = path.basename(fileUrl);
  const downloadDir = `${download_path}/${embedding_model_name}`;
  try {
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
      const sourceDir = path.join(process.cwd(), embedding_model_name)
      await copyDirectory(sourceDir, downloadDir)
    }
    const embeddingCkpt = path.join(downloadDir, filename);
    if (fs.existsSync(embeddingCkpt)) {
      const fileHash = await getFileHash(downloadDir + '/' + filename);
      if (fileHash === hashTag) {
        callback(null, 'model exists');
        return;
      }
    }
    await downloads(fileUrl, {
      dest: downloadDir,
      filename,
      extract: false,
    });
    listAllFiles(downloadDir);
    const fileHash = await getFileHash(downloadDir + '/' + filename);
    if (fileHash === hashTag) {
      callback(null, 'download success');
    } else {
      callback(new Error('file hash not match,please retry'));
    }

  } catch (e) {
    console.log(e);
    callback(e);
  }

};