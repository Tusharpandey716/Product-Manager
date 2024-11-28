# Product Mapper

## Overview

The **Product Mapper** is a system designed to match product names and their variations, providing a standardized mapping for easier management and consistency. The project consists of three main components: a frontend user interface, a backend REST API, and an SQLite database for storing mappings. This system is ideal for managing product variations, improving data consistency, and simplifying the product categorization process.

## Features

### Frontend
- **User-Friendly Interface**: A clean, responsive design for both mobile and desktop devices.
- **Dynamic Mappings**: Displays the current product mappings in real-time for easier management.
- **Validation and Feedback**: Input validation with error messages to guide the user during mapping actions.
- **Mobile-First Design**: Fully responsive for mobile and desktop platforms.

- frontend link:-https://profound-fenglisu-7d10a3.netlify.app/

### Backend
- **REST API**:
  - `GET /find`: Matches a given product name with existing mappings.
  - `POST /add`: Adds new product name mappings.
  - `GET /mappings`: Retrieves all current mappings in the system.
- **SQLite Database**: Stores mappings between product name variations and their standardized names.
- **String Normalization**: Basic normalization techniques to handle variations in case, spacing, and abbreviations.

### Database
- **Mapping Storage**: Stores product variations and standardized names.
- **Dynamic Updates**: Supports adding new mappings and updates as users interact with the system.

## Assumptions Made

1. **Variation Handling**:
   - Minor differences in product names, such as case differences, spacing, or common abbreviations, can be normalized using basic preprocessing techniques.
   - Exact match is expected after normalization for mapping success.
   
2. **Standardized Names**:
   - Users will provide clear and unique standardized names for each product type during the mapping process.

3. **Input Consistency**:
   - Users will avoid inputting completely irrelevant or misspelled data. Edge cases are handled to a basic extent.

4. **API Interactions**:
   - Assumes the backend server is hosted locally on `http://localhost:3000`.

## Use Cases the System Can Handle

1. **Exact and Normalized Matching**:
   - Matches products with different cases (e.g., `A4 Paper` vs. `a4 paper`) or slight differences in spacing (e.g., `500sh` vs. `500 sh`).

2. **Dynamic Mapping Updates**:
   - Users can add new variations of product names and update the mapping dictionary dynamically.

3. **Real-Time Feedback**:
   - Provides immediate feedback if a match is found or prompts users to add new mappings if no match is found.

4. **Mapping Retrieval**:
   - Displays all current mappings for transparency and easier manual updates.

## Use Cases the System Cannot Handle

1. **Complex Variations**:
   - Fails to match products with entirely different phrasing or descriptions that require advanced semantic understanding.  
     Example: `"Printer Paper"` vs. `"A4 Copy Paper 500 sheets"`.

2. **Domain-Specific Knowledge**:
   - Cannot infer relationships between products that require knowledge of synonyms or context.  
     Example: `"Sticky Notes"` vs. `"Post-it Notes"`.

3. **Multi-Language Support**:
   - The system currently only supports inputs in a single language (e.g., English) and will fail for multilingual variations.

4. **Duplicate Variations**:
   - There is no deduplication mechanism if users unknowingly input duplicate mappings.

## Future Improvement Ideas

1. **Advanced Matching**:
   - Implement a fuzzy matching algorithm (e.g., Levenshtein distance) to handle typos and more diverse variations.
   - Use Natural Language Processing (NLP) for semantic matching.

2. **Duplicate Prevention**:
   - Add a feature to detect and prevent duplicate entries in the mapping dictionary.

3. **Bulk Import/Export**:
   - Allow users to upload or download mappings in bulk (e.g., via CSV files) for better scalability.

4. **Search Feature**:
   - Add a search bar in the frontend to filter current mappings for easier navigation.

5. **Multi-Language Support**:
   - Extend the system to handle multilingual inputs using language translation APIs.

6. **Analytics Dashboard**:
   - Provide insights on frequently searched or unmatched product names to help users improve the dictionary.

7. **Authentication**:
   - Add user authentication and role-based access to secure the mapping system.

8. **Cloud Deployment**:
   - Deploy the system to a cloud service (e.g., AWS, Azure) for better availability and scalability.

## Getting Started

### Prerequisites

- Node.js (version 16 or later)
- SQLite (for database storage)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/product-mapper.git
   cd product-mapper
