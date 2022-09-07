/**
 * EditFormModal
 * @author WY <yang.wang06@hand-china.com>
 * @date 2019-05-29
 * @copyright 2019-05-29 © HAND
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Input, Modal, Row } from 'hzero-ui';
import { Bind } from 'lodash-decorators';

import Lov from 'components/Lov';

import { EDIT_FORM_CLASSNAME, EDIT_FORM_ROW_LAYOUT, MODAL_FORM_ITEM_LAYOUT } from 'utils/constants';

@Form.create({ fieldNameProp: null })
export default class EditFormModal extends Component {
  static propTypes = {
    isCreate: PropTypes.bool,
    languageMessage: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isCreate: true,
  };

  @Bind()
  handleModalOk() {
    const { form, onOk } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        onOk(fieldsValue);
      }
    });
  }

  @Bind()
  handleModalCancel() {
    const { onCancel } = this.props;
    onCancel();
  }

  render() {
    const {
      form,
      isCreate,
      visible = false,
      record = {},
      languageMessage,
      createLoading = false,
      updateLoading = false,
      queryDetailLoading = false,
      isSiteFlag = false,
    } = this.props;
    const modalTitle = isCreate
      ? languageMessage.view.title.create
      : languageMessage.view.title.edit;
    return (
      <Modal
        destroyOnClose
        width={520}
        wrapClassName="ant-modal-sidebar-right"
        transitionName="move-right"
        visible={visible}
        title={modalTitle}
        onOk={this.handleModalOk}
        onCancel={this.handleModalCancel}
        confirmLoading={createLoading || updateLoading}
        cancelButtonProps={{ disabled: createLoading || updateLoading }}
        okButtonProps={{ disabled: queryDetailLoading }}
      >
        <Form className={EDIT_FORM_CLASSNAME}>
          <Row {...EDIT_FORM_ROW_LAYOUT}>
            {isSiteFlag && (
              <Col>
                <Form.Item
                  {...MODAL_FORM_ITEM_LAYOUT}
                  label={languageMessage.model.tenantWord.tenant}
                >
                  {form.getFieldDecorator('tenantId', {
                    initialValue: record.tenantId,
                    rules: [
                      {
                        required: true,
                        message: languageMessage.common.validation.notNull(
                          languageMessage.model.tenantWord.actualWord
                        ),
                      },
                    ],
                  })(
                    <Lov
                      allowClear
                      textValue={record.tenantName}
                      code="HPFM.TENANT"
                      disabled={!isCreate}
                    />
                  )}
                </Form.Item>
              </Col>
            )}
            <Col>
              <Form.Item
                {...MODAL_FORM_ITEM_LAYOUT}
                label={languageMessage.model.tenantWord.actualWord}
              >
                {form.getFieldDecorator('actualWord', {
                  initialValue: isCreate ? undefined : record.actualWord,
                  rules: [
                    {
                      required: true,
                      message: languageMessage.common.validation.notNull(
                        languageMessage.model.tenantWord.actualWord
                      ),
                    },
                    {
                      max: 300,
                      message: languageMessage.common.validation.max(300),
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item {...MODAL_FORM_ITEM_LAYOUT} label={languageMessage.model.tenantWord.word}>
                {form.getFieldDecorator('word', {
                  initialValue: isCreate ? undefined : record.word,
                  rules: [
                    {
                      max: 300,
                      message: languageMessage.common.validation.max(300),
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
