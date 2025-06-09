'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const [envVars, setEnvVars] = useState<{url: string | undefined, key: string | undefined}>({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  })

  useEffect(() => {
    async function testConnection() {
      try {
        // Log environment variables (only in development)
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
        console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          throw new Error('Missing Supabase environment variables')
        }

        // Try a simple auth check first
        const { data: authData, error: authError } = await supabase.auth.getSession()
        if (authError) {
          console.error('Auth error:', authError)
          throw authError
        }
        console.log('Auth check successful:', authData)

        // Then try a simple query
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .limit(1)
        
        if (error) {
          console.error('Database error:', error)
          throw error
        }

        console.log('Query successful:', data)
        setStatus('success')
      } catch (err) {
        setStatus('error')
        if (err instanceof Error) {
          console.error('Detailed error:', {
            message: err.message,
            name: err.name,
            stack: err.stack
          })
          setError(`${err.name}: ${err.message}`)
        } else {
          console.error('Unknown error:', err)
          setError('Unknown error occurred')
        }
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
      <div className="p-4 rounded-lg bg-gray-100">
        {status === 'loading' && <p>Testing connection...</p>}
        {status === 'success' && (
          <p className="text-green-600">Successfully connected to Supabase!</p>
        )}
        {status === 'error' && (
          <div className="text-red-600">
            <p className="font-bold">Error: {error}</p>
            <div className="mt-2 text-sm">
              <p>Environment Variables Status:</p>
              <ul className="list-disc list-inside">
                <li>Supabase URL: {envVars.url ? '✅ Set' : '❌ Missing'}</li>
                <li>Supabase Key: {envVars.key ? '✅ Set' : '❌ Missing'}</li>
              </ul>
              <p className="mt-2">Check the browser console for more detailed error information.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 