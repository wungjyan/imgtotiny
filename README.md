# imgtotiny

> 一个通用前端图片压缩插件，用于 web 端，可以针对 png 图片进行有损压缩

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
| width        | number  | 否       | -      | 输出图片的宽度，此时高度等比例计算，minSize 无效          |
| height       | number  | 否       | -      | 输出图片的高度，此时宽度等比例计算，minSize 无效          |
| returnBase64 | boolean | 否       | false  | 设置为 true 时，直接返回 base64 字符串                    |
| allKeepType  | boolean | 否       | false  | 当设置为 true 时，所有图片保持原类型输出，详见说明        |

## 说明

本插件压缩图片时，默认支持原图片类型输出的有 `image/jpeg`，`image/webp` 和 `image/png`。而 `svg` 图片会转成 `png` 格式再压缩输出，剩下其他类型的图片会转换成 `jpg` 格式再压缩输出。

这是因为除了 png 图片之外，别的图片压缩都是利用到 canvas 的 [toBlob](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toBlob) 方法，它的 `quality` 参数主要支持 `image/jpeg` 和 `image/webp`，当传入其他格式的图片时，是可以压缩的，但是这个 `quality` 参数就失去了控制，变成默认的压缩。

如果你仍然想保持原类型输出，可以设置 `allKeepType: true`，但不能保证结果，例如 `svg` 图片原类型压缩后就无法显示。

而对于 png 图片，是利用 [UPNG.js](https://github.com/photopea/UPNG.js) 进行有损压缩的，可以保持原类型输出。

`svg` 是无损压缩的矢量图，插件不能直接压缩，需要转换成 `png` 格式再压缩，之所以不是转换成 `jpg` 是因为转成 `jpg` 后，图片底色会变黑。

## 注意

如果不是特殊场景，建议设置 `allKeepType:false`，这样可以保证大部分图片正常显示。

当设置 `width` 或者 `height` 时，`minSize` 失效，因为裁切本身就会降低图片质量，此时可以适当提高 `quality` 的值，如 `0.9`。

## 更新

- `0.1.0`：添加等比例缩放裁切功能
