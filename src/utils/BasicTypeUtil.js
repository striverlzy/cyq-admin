import format from '@/utils/date'

const BasicTypeUtil = {

  /**
   * 时间格式化，将时间格式转成字符串
   */
  formateDate(datetime) {
    function addDateZero(num) {
      return (num < 10 ? "0" + num : num);
    }

    let d = new Date(datetime);
    let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate());
    return formatdatetime;
  }

}

export default Object.assign({}, BasicTypeUtil)
