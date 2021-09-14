export interface ShapeObj {
    x: number,
    y: number,
    width: number,
    height: number,
    path: string,
    viewBox: number,
    id: string,
    isSelect: boolean,
    rotate: number,
    isDbclick:boolean,
    bgColor:string,
    lineColor: string,
    textShape:{
        text: string,
        fontSize?: number,
        color?: string
    },
    lineShape:{
        strokeWidth: number,
        color: string,
        style: string,
        quadrant: number
    },
    zIndex: number,
    isImage: boolean,
    isLine: boolean,
    isSvg: boolean
}
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
        viewBox?: number,
        isLine?: boolean,
        style?: string,
        tip?: string
    },
    /**
     * 是否处于创建图形阶段
     */
    isCreatElement: boolean,
    /**
     * 存储所有的编辑中的图形
     */
    elementShapeArr: ShapeObj[],
    /**
     * 多选图形
     */
    multipleShapeArr: ShapeObj[],
    /**
     * 是否处于多选状态
     */
    isMultiple:boolean,
    isAddgridLine: boolean,
    closeAllPop:boolean,
    selectLinkFlow: { 
        path: string, 
        style: string,
        tip: string,
        id: number
    }
}