
// 生成36位id
export function uuid() :string{
    const s:(string|number)[] = []
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] as number & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "";
  
    const uuid = s.join("");
    return uuid;
}

/**
 * 读取图片文件的dataURL
 * @param file 图片文件
 */
 export const getImageDataURL = (file: File): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      resolve(reader.result as string)
    })
    reader.readAsDataURL(file)
  })
}

export const rgbtohsv = (r:number,g:number,b:number) => {
	r = r / 255
	g = g / 255
	b = b / 255
	let h = 0
	let s = 0
	let v = 0
	const min = Math.min(r,g,b)
	const max = Math.max(r,g,b)
	const difference = max - min
	if( max == min ){
		h = 0 
	}else{
		switch(max){
			case r: h=(g-b)/difference+(g < b ? 6 : 0);break;
			case g: h=2.0+(b-r)/difference;break;
			case b: h=4.0+(r-g)/difference;break;
		}
		h=Math.round(h*60);
	}
	if(max==0){
		s=0;
	}else{
		s=1-min/max;
	}
	s = Math.round(s*100)
	v = Math.round(s*100)
	return [h,s,v]
}

export const hsvtorgb = (h:number,s1:number,v1:number):number[] => {
	const s = s1 / 100
	const v = v1 / 100
	const h1 = Math.floor(h / 60) % 6
	const f = h / 60 - h1
	const p = v * (1 - s)
	const q = v * (1 - f * s)
	const t = v * (1 - (1 - f) * s)
	let r = 0
	let g = 0
	let b = 0
	switch (h1) {
		case 0: r = v; g = t; b = p; break;
		case 1: r = q; g = v; b = p; break;
		case 2: r = p; g = v; b = t; break;
		case 3: r = p; g = q; b = v; break;
		case 4: r = t; g = p; b = v; break;
		case 5: r = v; g = p; b = q; break;
	}
	return [Math.round(r * 255),Math.round(g * 255),Math.round(b * 255)]
}
