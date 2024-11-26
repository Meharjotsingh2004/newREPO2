import React from 'react';
import Layout from '../components/Layout/Layout';

export const Policy = () => {
  return (
    <Layout>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Privacy Policy</h1>
        <p>
          At <strong>Product Spotter</strong>, your privacy is our priority. This Privacy Policy outlines the types of information we collect, how we use it, and the measures we take to protect your data.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect the following types of information when you use our services:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, phone number, and address when you register an account.</li>
          <li><strong>Usage Data:</strong> Information about how you interact with our website, such as pages visited, time spent, and clicks.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>Your information helps us improve our services and provide a better user experience. Specifically, we use it to:</p>
        <ul>
          <li>Process and manage your account.</li>
          <li>Respond to your inquiries and provide customer support.</li>
          <li>Improve our website’s functionality and performance.</li>
          <li>Send promotional emails and updates (if you opt-in).</li>
        </ul>

       

       

       
      </div>
    </Layout>
  );
};

export default Policy;
