
export interface ChildrenOption {
    viewBox: number,
    path: string,
    name?: string
}

export interface ShapeOption {
    type: string, // 图标类型
    children: ChildrenOption[]
}
  