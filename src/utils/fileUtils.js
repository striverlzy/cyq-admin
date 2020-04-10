let OSS = require('ali-oss');

let client = new OSS({
  endpoint: 'oss-cn-beijing.aliyuncs.com',
  accessKeyId: 'LTAI4Fcc7eXG3Mf9vTeVDwB7',
  accessKeySecret: 'wR7ZbF2uuItfLCMKtqYAOEP1HgbW0D',
  bucket: 'cyq-test'
});


// 上传
export async function put(filePath, file) {
  try {
    let result = await client.put(filePath, file)
    return result
  } catch (err) {
    console.log(err)
  }
}

// 删除
export async function remove(filePath) {
  try {
    let result = await client.delete(filePath)
    return result
  } catch (err) {
    console.log(err)
  }
}
