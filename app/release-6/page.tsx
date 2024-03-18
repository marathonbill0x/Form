'use client'
import Form from '../_components/form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form release={6}/>
    </main>
  );
}