import React from 'react'
import { isEmpty, getOption, pick } from '../../../helpers/inputForm'

export default class SelectInput extends React.PureComponent {
  static defaultProps = {
    name: 'input',
    tabIndex: 0,
    label: '',
    value: '',
    options: [],
    inputProps: {},
    labelProps: {},
    disabled: false,
    focus: false,
    placeholder: 'กรุณาเลือก',
    type: 'text'
  }

  handleSelectChange = e => {
    const { options, handleChange } = this.props
    const value = e.target.value
    handleChange(getOption(value, options))
  }

  renderCustomElement = () => {
    const {
      label,
      value,
      disabled,
      focus,
      placeholder,
      name,
      format,
      errorMessage,
      options,
      inputProps,
      tabIndex,
      handleBlur,
      handleKeyCode
    } = this.props

    const renderOptions = []
    let renderErrorMessage = ''
    let classInput = 'form-input'
    let valueString = ''

    if (typeof value === 'string') {
      valueString = value
    } else {
      valueString = value.value ? value.value : ''
    }
    if (!isEmpty(errorMessage)) {
      classInput = 'form-input error'
    }

    for (var key in options) {
      renderOptions.push(
        <option value={options[key].value} key={`${key}-${options[key].value}`}>
          {options[key].label}
        </option>
      )
    }

    const input = (
      <select
        ref={input => {
          if (input != null && focus) {
            input.focus()
          }
        }}
        className={classInput}
        value={valueString}
        onChange={e => this.handleSelectChange(e)}
        onBlur={e => handleBlur(e.target.value)}
        onKeyUp={e => handleKeyCode(e)}
        disabled={disabled}
      >
        {renderOptions}
      </select>
    )
    return this.props.customElement(input, label, errorMessage)
  }

  render() {
    const {
      label,
      value,
      disabled,
      remark,
      focus,
      placeholder,
      name,
      format,
      errorMessage,
      options,
      inputProps,
      tabIndex,
      handleBlur,
      handleKeyCode
    } = this.props

    if (this.props.customElement) {
      return this.renderCustomElement()
    }

    const renderOptions = []
    let renderErrorMessage = ''
    let classInput = 'wrap-form-input'
    let valueString = ''

    if (typeof value === 'string') {
      valueString = value
    } else {
      valueString = value.value ? value.value : ''
    }
    if (!isEmpty(errorMessage)) {
      classInput = 'wrap-form-input error'
      renderErrorMessage = <div className='validation-label'>{errorMessage}</div>
    }

    for (var key in options) {
      renderOptions.push(
        <option value={options[key].value} key={`${key}-${options[key].value}`}>
          {options[key].label}
        </option>
      )
    }

    return (
      <div className='box-form-input'>
        <label className='form-label' htmlFor={label}>
          {label} {!isEmpty(remark) && <span className='remark'>{remark}</span>}
        </label>
        <div className={classInput}>
          <select
            ref={input => {
              if (input != null && focus) {
                input.focus()
              }
            }}
            className='form-input'
            value={valueString}
            onChange={e => this.handleSelectChange(e)}
            onBlur={e => handleBlur(e.target.value)}
            onKeyUp={e => handleKeyCode(e)}
            disabled={disabled}
          >
            <option value='' disabled>
              {placeholder}
            </option>
            {renderOptions}
          </select>
          {renderErrorMessage}
        </div>
        {this.props.children}
      </div>
    )
  }
}
