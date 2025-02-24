import React, { useState } from 'react';
import { Button, DatePicker, DatePickerProps, Form, Input, Modal } from 'antd';
import ttime, { DateTime, YMDDate } from '@tubular/time';
import { CalendarEvent } from '../page';

interface EventModalProps{
  updateEvents: (newEvents : CalendarEvent) => any
}

const EventModal: React.FC<EventModalProps> = ({updateEvents}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false);
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onFinish = (values: any) => {

    const name = values["eventName"]
    const date = values["eventDate"]
  
    const ymdDate : YMDDate = ttime(new Date(date.$y, date.$M, date.$D), undefined, 'en-us')
    console.log(ymdDate.m);
    console.log(ymdDate.d);
    console.log(ymdDate.y);
    console.log(date);

    updateEvents({day: date.$D, month : date.$M, year: date.$y, name: name})
    handleCancel()
  };

  const [form] = Form.useForm();

  return (
    <div className="flex items-center self-center min-w-80">
      <Button type="primary" onClick={showModal}>
        Add Event
      </Button>
      <Modal title="Event Information" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="">
        <Form name="eventForm" onFinish={onFinish} form={form}>
          <Form.Item label="Event Name" name="eventName" rules={[{ required: true }]}>
            <Input/>
          </Form.Item>

          <Form.Item label="Date" name="eventDate" rules={[{ required: true }]}>
            <DatePicker onChange={onChange} />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventModal;