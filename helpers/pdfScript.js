const rows = [...document.querySelectorAll(".row")]
const header = [...document.querySelectorAll('.rowHeader')]
const actionItems = [...document.querySelectorAll(".actionItem")]
const actions = [...document.querySelectorAll(".actions")]
actionItems.forEach((x,idx)=>{
    const height = rows[idx].clientHeight
    x.style.height = `${height}px`
})
actions.forEach((x,idx)=>{
    const padding = header[idx].clientHeight
    x.style.paddingTop = `${padding}px`
})