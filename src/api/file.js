import Http from '@/utils/axios'

export default {
  // 上传文件/图片
  upload(file) {
    const formData = new FormData()
    formData.append('file', file)
    return Http.post('/api/v1/file/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  offer(param) {
    return Http.post(`/api/v1/file/offer`, param)
  },
  answer(param) {
    return Http.post(`/api/v1/file/answer`, param)
  },
  candidate(param) {
    return Http.post(`/api/v1/file/candidate`, param)
  },
  cancel(param) {
    return Http.post(`/api/v1/file/cancel`, param)
  },
  invite(param) {
    return Http.post(`/api/v1/file/invite`, param)
  },
  accept(param) {
    return Http.post(`/api/v1/file/accept`, param)
  },
}
