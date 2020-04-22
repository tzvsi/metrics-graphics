export default class AbstractShape {
  data = null
  shapeObject = null
  xScale = null
  yScale = null
  color = null
  fillOpacity = 1
  strokeWidth = 0
  strokeColor = null

  /**
   * Create a new abstract shape.
   * This is an abstract class and not meant to be directly instantiated.
   *
   * @param {Object} data data point used to generate the shape.
   * @param {Scale} xScale scale used to compute x values.
   * @param {Scale} yScale scale used to compute y values.
   * @param {String} color color used for fill and stroke.
   * @param {Number} [fillOpacity=1] opacity of the shape fill.
   * @param {Number} [strokeWidth=0] width of the stroke around the shape.
   */
  constructor ({ data, xScale, yScale, color, fillOpacity, strokeWidth, strokeColor }) {
    this.data = data
    this.xScale = xScale
    this.yScale = yScale
    this.color = color
    this.fillOpacity = fillOpacity
    this.strokeWidth = strokeWidth
    this.strokeColor = strokeColor
  }

  /**
   * Render the shape and mount it to the given node.
   * Implemented by classes extending AbstractShape.
   *
   * @param {Object} svg D3 node to mount the shape to
   * @returns {void}
   */
  mountTo (svg) {}

  /**
   * Hide the shape by setting the opacity to 0. This doesn't remove the shape.
   * @returns {void}
   */
  hide () {
    if (this.shapeObject) this.shapeObject.attr('opacity', 0)
  }

  /**
   * Update the given parameters of the object.
   * Implemented by classes extending AbstractShape.
   *
   * @param {Object} args parameters to be updated
   * @returns {void}
   */
  update (args) {}

  /**
   * Update generic properties of the shape.
   * This method can be used in the implementations of {@link AbstractShape#update}.
   *
   * @param {String} color new color of the shape.
   * @param {Number} fillOpacity new fill opacity of the shape.
   * @param {Number} strokeWidth new stroke width of the shape.
   * @param {String} strokeColor new stroke color of the shape.
   * @returns {void}
   */
  updateGeneric ({ color, fillOpacity, strokeWidth, strokeColor }) {
    if (color) {
      this.color = color
      if (this.shapeObject) this.shapeObject.attr('fill', this.color)
    }
    if (fillOpacity) {
      this.fillOpacity = fillOpacity
      if (this.shapeObject) this.shapeObject.attr('fill-opacity', this.fillOpacity)
    }
    if (strokeWidth) {
      this.strokeWidth = strokeWidth
      if (this.shapeObject) this.shapeObject.attr('stroke-width', this.strokeWidth)
    }
    if (strokeColor) {
      this.strokeColor = strokeColor
      if (this.shapeObject) this.shapeObject.attr('stroke', this.strokeColor)
    }
  }

  /**
   * Remove the shape.
   *
   * @returns {void}
   */
  dismount () {
    if (this.shapeObject) this.shapeObject.remove()
  }
}
