export const readFile = async(file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        const result = reader.result.split(/\r?\n/)
        resolve(result)
      }
      reader.onerror = reject
    })
  }

export default readFile