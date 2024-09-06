const ysf = {
  device: function(){
    return navigator.userAgent.match(/mobile/i) ? 'Mobile' : 'Desktop'
  }
}
