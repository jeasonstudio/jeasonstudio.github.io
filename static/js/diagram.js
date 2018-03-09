'use strict'

var sequenceNodeList = document.querySelectorAll('.language-sequence')
for (var index = 0; index < sequenceNodeList.length; index++) {
  var element = sequenceNodeList[index]
  var sequenceCode = String(element.innerText)
  element.parentElement.innerHTML = '<div id="sequence' + index + '" style="text-align: center"><div>'

  var diagram = Diagram.parse(sequenceCode)
  diagram.drawSVG('sequence' + index, { theme: 'simple' })
}

var flowchartNodeList = document.querySelectorAll('.language-flow')
for (var index = 0; index < flowchartNodeList.length; index++) {
  var element = flowchartNodeList[index]
  var flowchartCode = String(element.innerText)
  element.parentElement.innerHTML = '<div id="flowchart' + index + '" style="text-align: center"><div>'

  var chart = flowchart.parse(flowchartCode)
  chart.drawSVG('flowchart' + index)
}

var dotNodeList = document.querySelectorAll('.language-dot')
for (var index = 0; index < dotNodeList.length; index++) {
  var element = dotNodeList[index]
  var fatherElement = element.parentElement
  fatherElement.innerHTML = Viz(element.innerText, { format: "svg", engine: "dot" })
  fatherElement.style['text-align'] = 'center'
}
