import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { userService } from '../services/auth';
import Navbar from '../component/Navbar';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    if (currentUser) {
      setUserData({
        ...userData,
        username: currentUser.username || '',
        email: currentUser.email || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (userData.password && userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // This would need to be implemented in your userService
      await userService.updateProfile({
        username: userData.username,
        email: userData.email,
        password: userData.password || undefined
      });
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear password fields after successful update
      setUserData({
        ...userData,
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError('Failed to update profile: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Row>
          <Col md={4}>
            <Card className="profile-sidebar">
              <Card.Body className="text-center">
                <div className="profile-avatar">
                  <i className="fas fa-user-circle"></i>
                </div>
                <h3 className="mt-3">{userData.username}</h3>
                <p className="text-muted">{userData.email}</p>
                <div className="d-grid gap-2 mt-4">
                  <Button 
                    variant={isEditing ? "secondary" : "primary"} 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={8}>
            <Card>
              <Card.Header as="h5">
                {isEditing ? 'Edit Profile' : 'Profile Information'}
              </Card.Header>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
                {isEditing ? (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>New Password (leave blank to keep current)</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    
                    <Button variant="success" type="submit">
                      Save Changes
                    </Button>
                  </Form>
                ) : (
                  <div className="profile-info">
                    <Row className="mb-3">
                      <Col md={4} className="fw-bold">Username:</Col>
                      <Col md={8}>{userData.username}</Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={4} className="fw-bold">Email:</Col>
                      <Col md={8}>{userData.email}</Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={4} className="fw-bold">Member Since:</Col>
                      <Col md={8}>
                        {userService.getCurrentUser()?.createdAt 
                          ? new Date(userService.getCurrentUser().createdAt).toLocaleDateString() 
                          : 'N/A'}
                      </Col>
                    </Row>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;