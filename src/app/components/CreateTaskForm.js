"use client";
import React, { useContext } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { AuthContext } from '../context/AuthContext'; // Update the path if needed
import { TaskContext } from '../context/TaskContext'; // Update the path if needed

const { Option } = Select;

const CreateTaskForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const { users } = useContext(AuthContext);
  const { tags, handleCreateTask } = useContext(TaskContext);

  const handleFinish = (values) => {
    handleCreateTask(values);
    onClose();
  };

  const handleClear = () => {
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      {/* Title */}
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter a title' }]}>
        <Input placeholder="Enter title" />
      </Form.Item>

      {/* Description */}
      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} placeholder="Enter description" />
      </Form.Item>

      {/* Assigned To */}
      <Form.Item label="Assigned To" name="assignedTo" rules={[{ required: true, message: 'Please select at least one user' }]}>
        <Select
          mode="multiple"
          placeholder="Select users"
          options={users.map(user => ({
            value: user.username,
            label: user.name + ' (' + user.email + ')',
          }))}
        />
      </Form.Item>

      {/* Tags */}
      <Form.Item label="Tags" name="tags">
        <Select
          mode="tags"
          placeholder="Select or create tags"
          options={tags.map(tag => ({
            value: tag,
            label: tag,
          }))}
        />
      </Form.Item>

        {/* Status and Priority Side by Side */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select a status' }]}>
            <Select placeholder="Select status">
              <Option value="To Do">To Do</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Done">Done</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Priority" name="priority" rules={[{ required: true, message: 'Please select a priority' }]}>
            <Select placeholder="Select priority">
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={handleClear} style={{ marginLeft: '8px' }}>
          Clear
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateTaskForm;
