
export interface State {
    /**
     * 布局尺寸
     */
    layout: {
       graphicWidth: number,
       middleWidth: number,
       toolsWidth: number
    },
    /**
     * 选中单个图形
     */
    singleGraph: {
        path: string,
        viewBox?: number
    },
    /**
     * 是否处于创建图形阶段
     */
    isCreatElement: boolean
}