# Three.js Shader Experimental Boilerplate

A modern React-based boilerplate for Three.js shader experiments, built with TypeScript and Vite. This project provides a solid foundation for creating interactive 3D graphics and shader experiments.

## 🚀 Features

- React 19 integration with Three.js
- TypeScript support for type safety
- Vite for fast development and building
- Motion library for smooth animations
- Custom hooks for:
  - Element size management
  - Three.js scene setup
  - Mouse interaction handling
- Modern ESLint configuration
- Prettier code formatting

## 🛠️ Tech Stack

- React 19
- Three.js
- TypeScript
- Vite
- Motion (for animations)
- ESLint + Prettier

## 📦 Installation

1. Clone the repository:

```bash
git clone git@github.com:quentinjeanningros/3_shader_experimental_boilerplate.git
```

2. Install dependencies:

```bash
npm install
```

## 🏃‍♂️ Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 🔨 Build

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🧹 Linting

Run ESLint:

```bash
npm run lint
```

## 📁 Project Structure

├── src/
│ ├── hooks/ # Custom React hooks
│ ├── three/ # Three.js related components and setup
│ ├── style/ # CSS styles
│ ├── types/ # TypeScript type definitions
│ └── main.tsx # Application entry point
├── public/ # Static assets
└── index.html # HTML entry point

## 🎮 Usage

The boilerplate comes with a basic Three.js scene setup that includes:

- Responsive canvas sizing
- Mouse interaction handling
- Spring-based animations
- Scene management through custom hooks

To start creating your shader experiments:

1. Add your shaders in the `three` directory
2. Modify the scene setup in `ThreeScene` component
3. Utilize the provided hooks for interaction and animation

## 🔧 Configuration

- TypeScript configuration in `tsconfig.json`
- Vite configuration in `vite.config.ts`
- ESLint rules in `eslint.config.js`
- Prettier settings in `.prettierrc`

## 📄 License

This project is licensed under the terms included in the LICENSE file.
