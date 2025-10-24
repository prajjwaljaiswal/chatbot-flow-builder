# Chat Builder

A powerful visual chat flow builder built with Next.js and React Flow. Create interactive chatbot conversations by designing message flows with an intuitive drag-and-drop interface.

**Live Demo**: [https://chatbot-flow-builder-cyan.vercel.app/](https://chatbot-flow-builder-cyan.vercel.app/)

## Features

### Core Functionality

- **Visual Flow Builder**: Drag and drop interface for creating chat flows
- **Message Nodes**: Create and customize message content for each conversation step
- **Node Connections**: Connect messages to create conversation flows
- **Real-time Editing**: Double-click nodes to edit message content instantly
- **Persistent Storage**: Automatically saves your flows to browser localStorage
- **Validation**: Ensures all nodes are properly connected before saving

### User Interface

- **Interactive Canvas**: Full-screen React Flow canvas with zoom and pan controls
- **Mini Map**: Navigate large flows with the built-in mini map
- **Node Panel**: Drag message nodes from the sidebar
- **Settings Panel**: Edit message content with a dedicated editing interface
- **Confirmation Modals**: Safe deletion and save operations with user confirmation

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **Context API**: Centralized state management with React Context
- **Formik Integration**: Form handling for message editing
- **Toast Notifications**: User feedback for all operations
- **Responsive Design**: Works on desktop and tablet devices

## Tech Stack

- **Framework**: Next.js 16.0.0
- **UI Library**: React 19.2.0
- **Flow Builder**: React Flow (@xyflow/react)
- **Styling**: Tailwind CSS
- **Forms**: Formik
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chat-builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## How to Use

### Creating a Chat Flow

1. **Add Message Nodes**

   - Drag the "Message" node from the left panel onto the canvas
   - Each node represents a message in your conversation

2. **Connect Messages**

   - Click and drag from the green handle (bottom) of one node to the blue handle (top) of another
   - This creates a conversation flow between messages

3. **Edit Message Content**

   - Double-click any message node to edit its content
   - Use the settings panel on the right to modify the message text
   - Click the back arrow to return to the node panel

4. **Save Your Flow**
   - Click "Save Changes" in the header to persist your chat flow
   - The system validates that all nodes are connected before saving

### Managing Nodes

- **Delete Nodes**: Click the trash icon on any message node
- **Move Nodes**: Drag nodes around the canvas to organize your flow
- **Zoom & Pan**: Use mouse wheel to zoom, drag to pan around large flows
- **Mini Map**: Use the mini map in the bottom-right to navigate large flows
