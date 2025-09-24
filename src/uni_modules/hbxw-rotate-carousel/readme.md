# hbxw-rotate-carousel 旋转木马轮播图组件

一个3D旋转木马效果、触摸滑动、自动播放的轮播图组件，支持高度自定义内容和指示器


```vue
<hbxw-rotate-carousel :list="dataList" />
```

## 使用示例

推荐先直接复制示例代码到工程中看效果了解下使用方法，看看是否符合项目需求再投入项目使用。

```vue
<template>
	<view class="demo-container">
		<view class="demo-section">
			<view class="section-title">1. 基础用法</view>
			<hbxw-rotate-carousel 
				:list="imageList" 
				height="268rpx" 
			/>
		</view>

		<view class="demo-section">
			<view class="section-title">2. 指示器样式 (line)</view>
			<hbxw-rotate-carousel 
				:list="imageList" 
				height="268rpx" 
				indicatorStyle="line"
				:autoplay="false" 
			/>
		</view>

		<view class="demo-section">
			<view class="section-title">3. 自定义内容 & 指示器插槽 (带点击事件)</view>
			<hbxw-rotate-carousel 
				:list="imageListWithTitle" 
				height="268rpx"
				@itemClick="onItemClick"
			>
				<!-- 内容插槽 -->
				<template v-slot:default="{ item }">
					<view class="slot-item-content">
						<image :src="item.image" mode="aspectFill" class="slot-image" />
						<view class="slot-overlay">
							<text class="slot-title">{{ item.title }}</text>
						</view>
					</view>
				</template>
				<!-- 指示器插槽 -->
				<template v-slot:indicator="{ currentIndex, total, goTo }">
					<view class="custom-indicator-wrapper">
						<text class="indicator-number">{{ currentIndex + 1 }} / {{ total }}</text>
					</view>
				</template>
			</hbxw-rotate-carousel>
			<view class="click-info">
				<text>上次点击: {{ clickedInfo }}</text>
			</view>
		</view>

	</view>
</template>

<script>
export default {
	data() {
		return {
			imageList: [
				{
					image: 'https://picsum.photos/750/300?random=1'
				},
				{
					image: 'https://picsum.photos/750/300?random=2'
				},
				{
					image: 'https://picsum.photos/750/300?random=3'
				},
				{
					image: 'https://picsum.photos/750/300?random=4'
				},
				{
					image: 'https://picsum.photos/750/300?random=5'
				},
				{
					image: 'https://picsum.photos/750/300?random=6'
				},
				{
					image: 'https://picsum.photos/750/300?random=7'
				}
			],
			imageListWithTitle: [
				{ image: 'https://picsum.photos/750/300?random=11', title: '风景 A' },
				{ image: 'https://picsum.photos/750/300?random=12', title: '建筑 B' },
				{ image: 'https://picsum.photos/750/300?random=13', title: '人物 C' },
				{ image: 'https://picsum.photos/750/300?random=14', title: '动物 D' },
				{ image: 'https://picsum.photos/750/300?random=15', title: '科技 E' },
			],
			clickedInfo: '尚未点击'
		}
	},
	methods: {
		onItemClick(payload) {
			console.log('Item clicked:', payload);
			const { item, index } = payload;
			this.clickedInfo = `索引 ${index}, 标题: ${item.title}`;
			uni.showToast({
				title: `点击了: ${item.title}`,
				icon: 'none'
			});
		}
	}
}
</script>

<style>
.demo-container {
	padding: 20rpx;
}

.demo-section {
	margin-bottom: 60rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 30rpx;
	color: #333;
	padding-bottom: 10rpx;
	border-bottom: 1px solid #eee;
}

.slot-item-content {
	width: 100%;
	height: 100%;
	position: relative;
	border-radius: 20rpx;
	overflow: hidden;
}
.slot-image {
	display: block;
	width: 100%;
	height: 100%;
}
.slot-overlay {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.4);
	padding: 10rpx 15rpx;
}
.slot-title {
	color: #fff;
	font-size: 26rpx;
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.custom-indicator-wrapper {
	background-color: rgba(0, 0, 0, 0.5);
	padding: 8rpx 20rpx;
	border-radius: 30rpx;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
	gap: 15rpx;
	flex-wrap: nowrap;
}
.indicator-number {
	color: #fff;
	font-size: 24rpx;
	white-space: nowrap;
}

.click-info {
	margin-top: 20rpx;
	padding: 15rpx;
	background-color: #f8f8f8;
	border: 1px dashed #ccc;
	border-radius: 8rpx;
	font-size: 26rpx;
	color: #555;
	text-align: center;
}
</style>
```

## API

### Props

| 属性名          | 类型    | 默认值      | 是否必填 | 说明                                                        |
| --------------- | ------- | ----------- | -------- | ----------------------------------------------------------- |
| `list`          | Array   | `[]`        | 是       | 数据列表。默认插槽下，数组项需包含 `image` 属性             |
| `height`        | String  | `'400rpx'`  | 否       | 轮播容器的高度，支持 rpx、px 等单位                         |
| `interval`      | Number  | `3000`      | 否       | 自动轮播切换间隔时间，单位毫秒                              |
| `autoplay`      | Boolean | `true`      | 否       | 是否自动轮播                                                |
| `showIndicator` | Boolean | `true`      | 否       | 是否显示指示器区域（包括默认指示器或 `indicator` 插槽）     |
| `indicatorStyle`| String  | `'dot'`     | 否       | 默认指示器样式，可选值为 `'dot'` (圆点) 或 `'line'` (线条) |

### Events

| 事件名      | 回调参数                                | 说明                                                         |
| ----------- | --------------------------------------- | ------------------------------------------------------------ |
| `itemClick` | `{ item: Object, index: Number }`         | 当前激活（居中）的轮播项被点击时触发，返回被点击项的数据和索引 |
| `change`    | `{ index, item, previousIndex }` | 轮播切换完成时触发，返回当前索引、数据项和上一个索引         |

### Slots

| 插槽名      | Scope / 插槽 Prop                         | 说明                                                         |
| ----------- | ----------------------------------------- | ------------------------------------------------------------ |
| `default`   | `{ item: Object, index: Number }`         | 自定义每个轮播项的显示内容。默认会显示一个 `<image>` 标签     |
| `indicator` | `{ currentIndex, total, goTo(index) }`    | 自定义指示器区域。`currentIndex` 为当前索引，`total` 为总数，`goTo` 为跳转方法 |

## 注意事项

*  传入 `list` 数组的数据结构：如果使用默认的内容插槽，每个对象需要包含 `image` 字段。如果使用自定义内容插槽，则可以根据 `item` 对象自定义渲染。
*  `itemClick` 事件仅在当前激活（居中）的轮播项被点击时触发，侧边的项不会触发该事件。
*  CSS 样式：组件内部的样式通过 `scoped` 隔离。自定义插槽内容的样式需要在父组件或全局样式中定义。
*  真实组件源码很小，是因为有示例演示动画才大，真实打包的时候示例动图是不会打包进去的，请放心使用
