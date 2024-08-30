export function serialize(obj:any) {
	return JSON.stringify(obj, function(key, val) {
		if (typeof val === 'function') {
			return val.toString();
		}
			return val;
	})
}

function sandBox(value) {
    const withStr = `with(obj) { return ${ value } }`;
    //创建监听对象
    const proxy = new Proxy(Object.create(null), {
      has(target, key) {
        if (['console', 'Math', 'Date'].includes(key)) {
          return target[key];
        }
        return true;
      },
      get(target, key) {
        if (key === Symbol.unscopables) return undefined;
        return target[key]
      }
    });
    return new Function('obj', withStr)(proxy); //将监听的对象作为obj参数传入
  };


export function deserialize(serialized:string){
    return JSON.parse(serialized, function(key, val) {
        if (/^function\s*\(.*\)\s*{/.test(val) || /^\(.*\)\s*=>/.test(val) || /^.*\s*\(.*\)\s*{/.test(val)) {
          return sandBox(val);
        }
        return val;
      });
}

export function numToThousands(num:number, label:string = ' ') {
  let numstr = num.toString()
  let integetStr = numstr
  let  decimalStr= ''
  if(numstr.includes('.')) {
    let numSplitstr = numstr.split('.')
    integetStr = numSplitstr[0]
    decimalStr = numSplitstr[1]
  }
  integetStr = integetStr.replace(/(\d)(?=(?:\d{3})+$)/g, `$1${label}`)
  if(decimalStr) {
    return `${integetStr}.${decimalStr}`
  } else {
    return integetStr
  }
 
}