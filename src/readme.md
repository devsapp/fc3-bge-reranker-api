
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# fc3-bge-reranker-api 帮助文档
<p align="center" class="flex justify-center">
    <a href="https://www.serverless-devs.com" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=fc3-bge-reranker-api&type=packageType">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=fc3-bge-reranker-api" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=fc3-bge-reranker-api&type=packageVersion">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=fc3-bge-reranker-api" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=fc3-bge-reranker-api&type=packageDownload">
  </a>
</p>

<description>

使用serverless devs将  开源Bert模型 bge-reranker-v2-m3 部署到函数计算上

</description>

<codeUrl>



</codeUrl>
<preview>



</preview>


## 前期准备

使用该项目，您需要有开通以下服务并拥有对应权限：

<service>



| 服务/业务 |  权限  | 相关文档 |
| --- |  --- | --- |
| 函数计算 |  创建函数 | [帮助文档](https://help.aliyun.com/product/2508973.html) [计费文档](https://help.aliyun.com/document_detail/2512928.html) |

</service>

<remark>



</remark>

<disclaimers>



</disclaimers>

## 部署 & 体验

<appcenter>
   
- :fire: 通过 [Serverless 应用中心](https://fcnext.console.aliyun.com/applications/create?template=fc3-bge-reranker-api) ，
  [![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://fcnext.console.aliyun.com/applications/create?template=fc3-bge-reranker-api) 该应用。
   
</appcenter>
<deploy>
    
- 通过 [Serverless Devs Cli](https://www.serverless-devs.com/serverless-devs/install) 进行部署：
  - [安装 Serverless Devs Cli 开发者工具](https://www.serverless-devs.com/serverless-devs/install) ，并进行[授权信息配置](https://docs.serverless-devs.com/fc/config) ；
  - 初始化项目：`s init fc3-bge-reranker-api -d fc3-bge-reranker-api`
  - 进入项目，并进行项目部署：`cd fc3-bge-reranker-api && s deploy -y`
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

本应用旨在帮助开发者实现将[BAAI/bge-reranker-v2-m3](https://huggingface.co/BAAI/bge-reranker-v2-m3) 模型应用部署到阿里云函数计算，该模型应用主要应用在RAG场景，用来针对混合检索的结果进行重新排序，让最终RAG的问答效果更加精确。

提供了API的访问能力，支持动态更换模型


</appdetail>

## 使用流程

<usedetail id="flushContent">

部署成功之后我们访问域名进入 swagger Ui界面

![reanker](https://img.alicdn.com/imgextra/i1/O1CN01gOHwU921SGgzZkd8I_!!6000000006983-0-tps-2842-1010.jpg)
 
我们可以访问 /reank 接口进行调试，该接口的参数如下:

```json
{
  "query": "string",
  "compare_to": [
    "string"
  ]
}
```
其中 query 是字符串类型，表示查询语句， 取值一般是用户输入的问题，
compare_to 是字符串的数组， 表示跟查询语句对照的相关答案， 取值一般是经过 向量检索或者全文检索之后的答案

比如输入的测试内容：
```json
{
  "query": "什么是函数计算",
  "compare_to": [
    "你好",
    "函数计算是阿里云Serverless计算服务，提供专业的Serverless架构服务托管",
    "今天天气怎么样"
  ]
}
```
最终的答案如下：
```json
{
  "data": [
    0.0014783033167132958,
    0.9987711227165861,
    0.000016219460204138508
  ],
  "object": "list"
}
```
其中，data的结果展示了这几个答案跟问题的近似度，可以看到第二个答案的值最高，符合预期

</usedetail>

## 注意事项

<matters id="flushContent">
</matters>


<devgroup>


## 开发者社区

您如果有关于错误的反馈或者未来的期待，您可以在 [Serverless Devs repo Issues](https://github.com/serverless-devs/serverless-devs/issues) 中进行反馈和交流。如果您想要加入我们的讨论组或者了解 FC 组件的最新动态，您可以通过以下渠道进行：

<p align="center">  

| <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407298906_20211028074819117230.png" width="130px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png" width="130px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407252200_20211028074732517533.png" width="130px" > |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| <center>微信公众号：`serverless`</center>                                                                                         | <center>微信小助手：`xiaojiangwh`</center>                                                                                        | <center>钉钉交流群：`33947367`</center>                                                                                           |
</p>
</devgroup>
