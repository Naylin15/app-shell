import React from 'react'
import PropTypes from 'prop-types'
import listRender from './listRender'

const Loader = (props) => {
  let content = []

  for (let index = 0; index < props.count; index += 1) {
    content = [
      ...content,
      listRender({
        type: props.type,
        index,
      }),
    ]
  }

  return (
    <div>{content}</div>
  )
}

Loader.propTypes = {
  count: PropTypes.number,
  type: PropTypes.oneOf(['list', 'content']),
}

Loader.defaultProps = {
  count: 1,
  type: 'list',
}

export default Loader
