import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { searchRecipes } from '../services/recipe';

function RecipeSearch({ onSearchResults }) {
  const [query, setQuery] = useState('');
  
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await searchRecipes(query);
      onSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <Container className="my-4">
      <Form onSubmit={handleSearch}>
        <Row>
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Search recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Button variant="primary" type="submit" className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default RecipeSearch;