import { Button, DatePicker, Form, Input, notification, Select, Switch } from 'antd';
import { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { CreateEvent } from '../../models/messages/CreateEvent';
import { eventService } from '../../services/eventService';
import { userService } from '../../services/userService';
import { userState } from '../../state/user';

export const Add = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [isAdding, setIsAdding] = useState(false);
  const [isAllDayEvent, setIsAllDayEvent] = useState(false);
  const [form] = Form.useForm();
  const [users, setUsers] = useState<Array<{ fullName: string; userId: string }>>([]);

  const handleAllDayToggleChange = (isAllDay: boolean) => {
    setIsAllDayEvent(isAllDay);
  };

  const handleCreate = () => {
    form
      .validateFields()
      .then(
        (values) =>
          ({
            title: values.title,
            description: values.description,
            allDay: values.allDay,
            start: values.allDay
              ? (values.range as Moment).add(3, 'hours').toISOString()
              : (values.range[0] as Moment).add(3, 'hours').toISOString(),
            end: values.allDay
              ? (values.range as Moment).add(1, 'days').startOf('day').toISOString()
              : (values.range[1] as Moment).add(3, 'hours').toISOString(),
            userIds: values.attendees
          } as CreateEvent)
      )
      .then(async (event) => {
        setIsAdding(true);
        const result = await eventService.createEvent(event);
        setIsAdding(false);

        if (result.isSuccessful) {
          notification.success({ message: 'Success', description: 'Event is created!' });
        } else {
          notification.error({ message: 'Error', description: 'Something went wrong...' });
        }

        navigate('/events/list');
      })
      .catch((_) => _);
  };

  useEffect(() => {
    userService
      .getUsers()
      .then((result) => setUsers(result.users?.filter((u) => u.userId !== user.userId) as any));
  }, [user]);

  return (
    <StyledDiv>
      <Title>Create Event</Title>

      <Form form={form} onSubmitCapture={handleCreate}>
        <Form.Item name="title" rules={[{ required: true, message: 'Field is required' }]}>
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item name="description" rules={[{ required: true, message: 'Field is required' }]}>
          <Input.TextArea placeholder="Description" autoSize />
        </Form.Item>

        <Form.Item name="allDay" label="All day event?">
          <Switch
            onChange={handleAllDayToggleChange}
            checkedChildren="All Day"
            unCheckedChildren="Not All"
          />
        </Form.Item>

        <Form.Item name="range" rules={[{ required: true, message: 'Field is required' }]}>
          {isAllDayEvent ? (
            <DatePicker />
          ) : (
            <DatePicker.RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
          )}
        </Form.Item>

        <Form.Item name="attendees" rules={[{ required: true, message: 'Field is required' }]}>
          <Select mode="multiple" allowClear placeholder="Select attendees">
            {users.map((u) => (
              <Select.Option id={u.userId} value={u.userId}>
                {u.fullName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Button block type="primary" htmlType="submit" loading={isAdding}>
          Create
        </Button>
      </Form>
    </StyledDiv>
  );
};

const Title = styled.h1`
  text-align: center;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  width: 400px;

  .ant-picker {
    width: 100%;
  }

  .ant-select-selector svg {
    margin-bottom: 5px;
  }
`;
