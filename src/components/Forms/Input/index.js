import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'office-ui-fabric-react'
import I18n from 'shared/i18n'
import ErrorValidation from 'components/ErrorValidation'

/**
 * Component to create a custom input
 * @class Input
 * @extends PureComponent
 */
class Input extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      isCorrect: true,
      errors: [],
      className: 'win-textbox',
    }
  }

  /**
   * Make sure that the state and props are in sync for when it is required
   * @static
   * @function getDerivedStateFromProps
   * @param {object} nextProps
   * @param {object} prevState
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.isCorrect || nextProps.forceValidation) {
      if (nextProps.parametersToEvaluate) {
        const validation = ErrorValidation.validation(nextProps.parametersToEvaluate, nextProps.value)
        return {
          isCorrect: validation.isCorrect,
          errors: validation.errors,
          className: validation.isCorrect ? 'win-textbox' : 'win-textbox error-input',
        }
      }
      return null
    }
    return null
  }

  /**
   * Return the name and value to the father
   * @function change
   * @param {object} eventObject
   */
  change = (eventObject) => {
    this.props.function(this.props.name, eventObject.target.value)
  }

  /**
   * Validate if the entered data are valid
   * @function validate
   * @param {object} parametersToEvaluate
   * @param {string} value
   */
  validate = (parametersToEvaluate, value) => {
    if (parametersToEvaluate) {
      const validation = ErrorValidation.validation(parametersToEvaluate, value)

      this.setState({
        isCorrect: validation.isCorrect,
        errors: validation.errors,
        className: validation.isCorrect ? 'win-textbox' : 'win-textbox error-input',
      })
    }
  }

  /**
   * Open dialog to handle email delete
   * @function dialogDelete
   */
  dialogDelete = () => {
    this.props.confirmation.showDialog({
      title: `${I18n.t('commons.delete')} ${this.props.label}`,
      message: this.props.value,
      isOk: this.deleteEmail,
    })
  }

  /**
   * Delete an email of the list
   * @function deleteEmail
   */
  deleteEmail = () => {
    this.props.delete(this.props.name)
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const deleteIcon = this.props.delete
      ? (
        <Icon
          iconName="Delete"
          style={{ margin: 10, fontSize: 18 }}
          onClick={this.dialogDelete}
        />
      )
      : undefined
    return (
      <div className="froms__col">
        <p>
          {this.props.label}
        </p>
        <input
          type={this.props.type}
          className={this.state.className}
          name={`${this.props.type}-${this.props.name}`}
          value={(this.props.value || '')}
          placeholder={this.props.placeholder}
          onChange={this.change}
          onBlur={() => this.validate(this.props.parametersToEvaluate, this.props.value)}
          disabled={this.props.disabled}
          style={this.props.style}
          ref={this.props.inputRef}
          required={this.props.required}
        />
        <ErrorValidation errors={this.state.errors} />
        { deleteIcon }
      </div>
    )
  }
}

Input.defaultProps = {
  label: '',
  value: '',
  type: 'text',
  required: false,
  placeholder: null,
  function: () => {},
  disabled: false,
  style: {},
  inputRef: () => { },
  delete: null,
  parametersToEvaluate: null,
  forceValidation: false,
  confirmation: { showDialog: () => {} },
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  function: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  inputRef: PropTypes.func,
  delete: PropTypes.func,
  parametersToEvaluate: PropTypes.object,
  // eslint-disable-next-line
  forceValidation: PropTypes.bool,
  required: PropTypes.bool,
  confirmation: PropTypes.object,
}

export default Input
