# imgtotiny

> 一个前端图片压缩插件，用于 web 端，可以针对 png 图片进行有损压缩

## 安装

使用 npm 安装

```bash
npm install imgtotiny
```

## 使用

```js
import imgToTiny from 'imgtotiny'

const changeFile = async e => {
  const file = e.target.files[0]
  const newFile = await imgToTiny(file)
  // 或者传入参控制
  const newFile2 = await imgToTiny(file, {
    quality: 0.5
  })
}
```

## Options

`options` 非必填，支持以下 4 个配置项：

| 名称         | 类型    | 是否必填 | 默认值 | 说明                                                      |
| :----------- | ------- | -------- | ------ | :-------------------------------------------------------- |
| quality      | number  | 否       | 0.6    | 压缩质量，范围 0-1 之间，值越小压缩率更高                 |
| minSize      | number  | 否       | -      | 最小尺寸，单位字节（b），当传入图片尺寸小于这个值时不压缩 |
| returnBase64 | boolean | 否       | false  | 设置为 true 时，直接返回 base64 字符串                    |
| allKeepType  | boolean | 否       | false  | 当设置为 true 时，所有图片保持原类型输出，详见说明        |

## 说明

本插件压缩图片时，默认支持原图片类型输出的有 `image/jpeg`，`image/webp` 和 `image/png`，其他类型的图片会转换成 `jpg` 格式再压缩输出。

这是因为除了 png 图片之外，别的图片压缩都是利用到 canvas 的 [toBlob](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toBlob) 方法，它的 `quality` 参数主要支持 `image/jpeg` 和 `image/webp`，当传入其他格式的图片时，是可以压缩的，但是这个 `quality` 参数就失去了控制，变成默认的压缩。

如果你仍然想保持原类型输出，可以设置 `allKeepType: true`。

而对于 png 图片，是利用 [UPNG.js](https://github.com/photopea/UPNG.js) 进行有损压缩的，可以保持原类型输出。