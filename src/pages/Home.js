import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, Zap } from 'lucide-react';

const Counter = React.lazy(() => import('../components/Counter'));
const UserForm = React.lazy(() => import('../components/UserForm'));
const RichTextEditor = React.lazy(() => import('../components/RichTextEditor'));
const Chart = React.lazy(() => import('../components/Chart'));

const ComponentLoader = () => (
  <div className="loader-container">
    <motion.div
      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      <Loader2 className="loader-spinner" />
    </motion.div>
  </div>
);

const Home = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 15px 30px rgba(0,0,0,0.2)"
    }
  };

  return (
    <div className="home-container">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="content-container"
      >
        <div className="row">
          <div className="col">
            <motion.div 
              className="card card-white"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <div className="card-header">
                <h2>Counter</h2>
                <Zap className="card-icon" />
              </div>
              <Suspense fallback={<ComponentLoader />} >
                <Counter />
              </Suspense>
            </motion.div>
          </div>
          <div className="col">
            <motion.div 
              className="card card-pink"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <div className="card-header">
                <h2>Rich Text Editor</h2>
                <Sparkles className="card-icon" />
              </div>
              <Suspense fallback={<ComponentLoader />} >
                <RichTextEditor />
              </Suspense>
            </motion.div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <motion.div 
              className="card card-teal"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <div className="card-header">
                <h2>User Form</h2>
                <Sparkles className="card-icon" />
              </div>
              <Suspense fallback={<ComponentLoader />} >
                <UserForm />
              </Suspense>
            </motion.div>
          </div>
          <div className="col">
            <motion.div 
              className="card card-blue"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <div className="card-header">
                <h2>Pie Chart</h2>
                <Zap className="card-icon" />
              </div>
              <Suspense fallback={<ComponentLoader />} >
                <Chart />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div 
        className="divider-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="divider divider-purple"></div>
        <div className="divider divider-teal"></div>
        <div className="divider divider-blue"></div>
      </motion.div>
      <style jsx>{`
        .home-container {
          padding: 2rem;
          background: linear-gradient(to bottom right, #f0f4f8, #d6d8e7);
        }

        .content-container {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
        }

        .row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .col {
          flex: 1;
          max-width: 100%;
          padding: 0.5rem;
        }

        .card {
          border-radius: 1rem;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(5px);
          transition: all 0.3s ease;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .card h2 {
          font-size: 1.5rem;
          color: #4c4c4c;
        }

        .card-icon {
          font-size: 1.5rem;
          color: #4c4c4c;
        }

        .card:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .card-white {
          background-color: #fff; /* White background for the counter card */
          color: #4c4c4c;
        }

        .card-pink {
          background: linear-gradient(145deg, #ec7e8f, #ff4d7f);
          color: #fff;
        }

        .card-teal {
          background: linear-gradient(145deg, #16a085, #1abc9c);
          color: #fff;
        }

        .card-blue {
          background: linear-gradient(145deg, #3b82f6, #1d4ed8);
          color: #fff;
        }

        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        .loader-spinner {
          font-size: 3rem;
          color: #3b82f6;
        }

        .divider-container {
          margin-top: 2rem;
          display: flex;
          gap: 1rem;
          flex-direction: column;
        }

        .divider {
          border-bottom: 2px solid rgba(0, 0, 0, 0.1);
        }

        .divider-purple {
          border-color: #9b4dca;
        }

        .divider-teal {
          border-color: #16a085;
        }

        .divider-blue {
          border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default Home;
