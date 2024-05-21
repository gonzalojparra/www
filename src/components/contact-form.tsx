'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormValues, formSchema } from '@/lib/validation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const { handleSubmit, formState, control } = form;
  const { isSubmitting } = formState;

  async function onSubmit(data: FormValues) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          message: data.message
        })
      })
        .then(response => response.json())
        .then(data => {
          toast({
            title: 'Email sent',
            description: 'I will get back to you as soon as possible!',
            variant: 'default'
          });
        })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while sending the email',
        variant: 'destructive'
      });
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardDescription className='font-mono text-center'>
            Please, fill out the form below and I'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <FormField
                      control={control}
                      name='firstName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id='first-name'
                              placeholder='Your first name'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='space-y-2'>
                    <FormField
                      control={control}
                      name='lastName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id='last-name'
                              placeholder='Your last name'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <FormField
                    control={control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id='email'
                            placeholder='Your email'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='space-y-2'>
                  <FormField
                    control={control}
                    name='message'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            id='message'
                            placeholder='Enter your message'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full mt-6'
              >
                {isSubmitting && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}