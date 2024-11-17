const DownloadMimeTypes = Object.freeze({
  json: 'application/json;charset=utf-8;',
  text: 'text/plain;charset=utf-8;',
  css: 'text/css;charset=utf-8;',
  svg: 'image/svg+xml;charset=utf-8;'
})

class DownloadUtils {
  mimeTypes = DownloadMimeTypes

  download = async (fileName: string, mimeType: string, dataStr: string) => {
    // const exportFileDefaultName = 'data.json'

    const blob = new Blob([dataStr], { type: mimeType })
    const url = URL.createObjectURL(blob)
    // const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)

    const link = document.createElement('a')
    if (link.download !== undefined) {
      link.style.visibility = 'hidden'
      // link.setAttribute('href', dataUri)
      link.setAttribute('href', url)
      link.setAttribute('download', fileName)
      link.click()
    }
    // document.removeChild(link)

    return true
  }
}

const _downloadUtils = Object.freeze(new DownloadUtils())

export const useDownloadUtils = () => {
  return _downloadUtils
}
