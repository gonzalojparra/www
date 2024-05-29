'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export function ContactForm() {
  const { toast } = useToast();
  const t = useTranslations();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      honeypot: '',
    }
  });

  const { handleSubmit, formState, control } = form;
  const { isSubmitting, errors } = formState;

  async function onSubmit(data: FormValues) {
    if (data.honeypot) {
      toast({
        title: t('contact-section.form.spam-detected-title'),
        description: t('contact-section.form.spam-detected-description'),
        variant: 'destructive',
      });
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          message: data.message,
        }),
      });

      const result = await response.json();
      toast({
        title: t('contact-section.form.toast-success-title'),
        description: t('contact-section.form.toast-success-description'),
        variant: 'default',
      });
      form.reset();
    } catch (error) {
      toast({
        title: t('contact-section.form.toast-error-title'),
        description: t('contact-section.form.toast-error-description'),
        variant: 'destructive',
      });
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardDescription className='font-mono text-center'>
            {t('contact-section.form.form-description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <FormField
                      control={control}
                      name='firstName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t('contact-section.form.first-name-label')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id='first-name'
                              placeholder={t('contact-section.form.first-name-placeholder')}
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
                          <FormLabel>
                            {t('contact-section.form.last-name-label')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id='last-name'
                              placeholder={t('contact-section.form.last-name-placeholder')}
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
                        <FormLabel>
                          {t('contact-section.form.email-label')}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id='email'
                            placeholder={t('contact-section.form.email-placeholder')}
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
                        <FormLabel>
                          {t('contact-section.form.message-label')}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            id='message'
                            placeholder={t('contact-section.form.message-placeholder')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Honeypot Field */}
                <div style={{ display: 'none' }}>
                  <FormField
                    control={control}
                    name='honeypot'
                    render={({ field }) => (
                      <FormItem>
                        <Input
                          {...field}
                          id='honeypot'
                          tabIndex={-1}
                          autoComplete='off'
                        />
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
                {t('contact-section.form.submit-button')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}