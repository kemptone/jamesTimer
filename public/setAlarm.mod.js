import buildTimeleftMod from "./buildTimeleft.mod.js"

// First we check if you support touch, otherwise it's click:
// let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click'

export default All => {

  const buildTimeLeftHtml = buildTimeleftMod(All)

  function setAlarm () {
    let alarm = Number(All.e_hours.value) * 3600
    alarm += Number(All.e_minutes.value) * 60
    alarm += Number(All.e_seconds.value)
    All.alarm = alarm
    All.e_timeleft.innerHTML = buildTimeLeftHtml()
  }

  All.e_hours.addEventListener("change", setAlarm)
  All.e_minutes.addEventListener("change", setAlarm)
  All.e_seconds.addEventListener("change", setAlarm)

  function startAlarm () {

    setAlarm()
    window.clearInterval( All.interval )
    All.interval = window.setInterval(function() {

      if (All.alarm === 0) {
        return window.clearInterval( All.interval )
      }

      All.alarm = All.alarm - 1

      All.e_timeleft.innerHTML = buildTimeLeftHtml()

    }, 1000)
  }

  All.e_start.addEventListener("click", startAlarm)

}