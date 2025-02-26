# Interactive Generative Art Creator

A customizable generative art tool that lets you create beautiful visual patterns with various modes, styles, and parameters. Create mesmerizing animations using flow fields, spirals, explosions, and more.

## Features

- Multiple pattern modes (Flow Field, Orbital, Spiral, Explosion, Quantum Field)
- Pre-configured presets with different visual styles
- Extensive parameter customization
- Mouse interaction capability
- Image export functionality

## Running Locally

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/gen_art_maker.git
   cd generative-art-creator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a basic React app structure if you don't have one:
   ```bash
   npx create-react-app . --template typescript
   # Remove existing content from src/App.js
   ```

4. Place the GenerativeArtCreator component in your source directory:
   ```bash
   # Create a components directory
   mkdir -p src/components
   # Copy the GenerativeArtCreator.jsx file to this directory
   ```

5. Update your App.js to use the component:
   ```jsx
   import React from 'react';
   import GenerativeArtCreator from './components/GenerativeArtCreator';
   import './App.css';

   function App() {
     return (
       <div className="App">
         <header className="App-header">
           <h1>Generative Art Creator</h1>
         </header>
         <main className="p-4">
           <GenerativeArtCreator />
         </main>
       </div>
     );
   }

   export default App;
   ```

6. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

7. Open your browser and navigate to http://localhost:3000

## Usage Tips

- **Presets**: Click any preset button to quickly switch between different visual styles
- **Parameters**: Adjust sliders to fine-tune the behavior and appearance
- **Mouse Interaction**: Increase the "Mouse Influence" parameter and move your cursor over the canvas to affect particle movement
- **Save**: Click the "Save Image" button to download your creation as a PNG file

## Dependencies

- React
- No additional libraries required! All rendering is done using the HTML5 Canvas API

## License

MIT

---

Feel free to contribute to this project by submitting issues or pull requests!