import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
} from 'office-ui-fabric-react'
import I18n from 'shared/i18n'

const ConfirmationContext = React.createContext()

export const ConfirmationConsumer = ConfirmationContext.Consumer

export class ConfirmationProvider extends PureComponent {
  state = {
    dialogContent: {
      title: '',
      message: '',
      type: DialogType.normal,
    },
    handleIsOk: () => {
      this.setState({
        show: false,
      }, () => {
        this.state.isOk()
      })
    },
    showDialog: ({
      title,
      message,
      isOk,
      isCancel,
    }) => {
      this.setState({
        dialogContent: { type: DialogType.normal, title, message },
        isOk,
        isCancel: isCancel || undefined,
        show: true,
      })
    },
    hideDialog: () => {
      this.setState({
        show: false,
      }, () => {
        if (this.state.isCancel) {
          this.state.isCancel()
        }
      })
    },
    show: false,
  }

  render() {
    const context = { ...this.state }

    const dialog = (
      <Dialog
        hidden={!context.show}
        onDismiss={context.hideDialog}
        dialogContentProps={{
          type: context.dialogContent.type,
          title: context.dialogContent.title,
          subText: context.dialogContent.message,
        }}
      >
        {null /** You can also include null values as the result of conditionals */}
        <DialogFooter>
          <PrimaryButton
            onClick={context.handleIsOk}
            text={I18n.t('commons.ok')}
          />
          <DefaultButton
            onClick={context.hideDialog}
            text={I18n.t('commons.cancel')}
          />
        </DialogFooter>
      </Dialog>)

    return (
      <React.Fragment>
        <ConfirmationContext.Provider value={{ showDialog: context.showDialog }}>
          {this.props.children}
        </ConfirmationContext.Provider>
        {dialog}
      </React.Fragment>
    )
  }
}

ConfirmationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
}
