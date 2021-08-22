
export interface ChildrenOption {
    viewBox: number,
    path: string,
    name?: string
}

export interface ShapeOption {
    type: string, // 图标类型
    children: ChildrenOption[]
}
  
export const enum OperateResizeHandlers {
    LEFT_TOP = 'left-top',
    TOP = 'top',
    RIGHT_TOP = 'right-top',
    LEFT = 'left',
    RIGHT = 'right',
    LEFT_BOTTOM = 'left-bottom',
    BOTTOM = 'bottom',
    RIGHT_BOTTOM = 'right-bottom',
}

export const enum OperateResizeBorder {
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
}