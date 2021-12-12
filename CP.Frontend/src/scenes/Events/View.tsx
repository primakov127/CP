import { Button, DatePicker, Form, Input, notification, Select, Switch } from 'antd';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Event } from '../../models/Event';
import { UpdateEvent } from '../../models/messages/UpdateEvent';
import { eventService } from '../../services/eventService';
import { userService } from '../../services/userService';
import { userState } from '../../state/user';

export const View = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const user = useRecoilValue(userState);
  const [users, setUsers] = useState<Array<{ fullName: string; userId: string }>>([]);
  const [event, setEvent] = useState<Event>();
  const [form] = Form.useForm();
  const [isAllDayEvent, setIsAllDayEvent] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAllDayToggleChange = (isAllDay: boolean) => {
    setIsAllDayEvent(isAllDay);
    if (form.getFieldValue('range')) {
      form.setFields([{ name: 'range', value: isAllDay ? form.getFieldValue('range')[0] : [] }]);
    }
  };

  const handleDelete = () => {
    if (event?.id) {
      eventService.removeEvent({ id: event.id }).then((result) => {
        if (result.isSuccessful) {
          notification.success({ message: 'Success', description: 'Event was removed!' });
        } else {
          notification.error({ message: 'Error', description: 'Something went wrong...' });
        }

        navigate('/events/list');
      });
    }
  };

  const handleUpdate = () => {
    form
      .validateFields()
      .then(
        (values) =>
          ({
            id: event?.id,
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
          } as UpdateEvent)
      )
      .then(async (event) => {
        setIsUpdating(true);
        const result = await eventService.updateEvent(event);
        setIsUpdating(false);

        if (result.isSuccessful) {
          notification.success({ message: 'Success', description: 'Event was updated!' });
        } else {
          notification.error({ message: 'Error', description: 'Something went wrong...' });
        }

        navigate('/events/list');
      })
      .catch((_) => _);
  };

  useEffect(() => {
    eventService.getEvent(eventId as string).then((e) => setEvent(e.event));
  }, [eventId]);

  useEffect(() => {
    userService.getUsers().then((result) => setUsers(result.users as any));
  }, []);

  useEffect(() => {
    setIsAllDayEvent(event?.allDay ?? false);
    form.setFields([
      { name: 'title', value: event?.title },
      { name: 'description', value: event?.details.description },
      { name: 'allDay', value: event?.allDay },
      {
        name: 'range',
        value: event?.allDay ? moment(event.start) : [moment(event?.start), moment(event?.end)]
      },
      {
        name: 'attendees',
        value: event?.attendees.map((a) => a.userId)
      }
    ]);
  }, [event, form, users]);

  useEffect(() => {
    setIsEditable(event?.creatorUserId === user.userId);
  }, [event, user]);

  return (
    <StyledDiv>
      <Title>Event Details</Title>

      <Form form={form} onSubmitCapture={handleUpdate}>
        <p id={event?.creatorUserId}>
          Organizer: {users.find((u) => u.userId === event?.creatorUserId)?.fullName}
        </p>

        <Form.Item name="title" rules={[{ required: true, message: 'Field is required' }]}>
          <Input placeholder="Title" disabled={!isEditable} />
        </Form.Item>

        <Form.Item name="description" rules={[{ required: true, message: 'Field is required' }]}>
          <Input.TextArea placeholder="Description" autoSize disabled={!isEditable} />
        </Form.Item>

        <Form.Item name="allDay" label="All day event?">
          <Switch
            onChange={handleAllDayToggleChange}
            checkedChildren="All Day"
            unCheckedChildren="Not All"
            disabled={!isEditable}
          />
        </Form.Item>

        <Form.Item name="range" rules={[{ required: true, message: 'Field is required' }]}>
          {isAllDayEvent ? (
            <DatePicker disabled={!isEditable} />
          ) : (
            <DatePicker.RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              disabled={!isEditable}
            />
          )}
        </Form.Item>

        <Form.Item name="attendees" rules={[{ required: true, message: 'Field is required' }]}>
          <Select mode="multiple" allowClear placeholder="Select attendees" disabled={!isEditable}>
            {isEditable
              ? users
                  .filter((u) => u.userId !== user.userId)
                  .map((u) => (
                    <Select.Option id={u.userId} value={u.userId}>
                      {u.fullName}
                    </Select.Option>
                  ))
              : users.map((u) => (
                  <Select.Option id={u.userId} value={u.userId}>
                    {u.fullName}
                  </Select.Option>
                ))}
          </Select>
        </Form.Item>

        {isEditable && (
          <>
            <StyledButton block type="primary" htmlType="submit" loading={isUpdating}>
              Update
            </StyledButton>
            <StyledButton block type="primary" danger onClick={handleDelete}>
              Delete
            </StyledButton>
          </>
        )}
      </Form>
    </StyledDiv>
  );
};

const Title = styled.h1`
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin-bottom: 10px;
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
