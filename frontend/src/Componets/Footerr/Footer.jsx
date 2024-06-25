import React from 'react'
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t, i18n } = useTranslation();
  return (
    <div>
   <footer class="bg-gray-800 text-white">
    <div class="container px-6 py-12 mx-auto">


        <div class="grid grid-cols-2 gap-6 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            <div>
                <h3 class="text-sm font-bold  ">{t('Internship by places')}</h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                <p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('New York')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Los Angeles')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Chicago')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('San Francisco')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Miami')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Seattle')}</p>
                </div>
            </div>

            <div>
                <h3 class="text-sm font-bold  ">{t('Internship by stream')}</h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                <p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('About us')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Careers')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Press')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('News')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Media kit')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Contact')}</p>

                </div>
            </div>

            <div>
                <h3 class="text-sm font-bold  ">{t('Job Places')}</h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Blog')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Newsletter')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Events')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Help center')}</a>                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">Tutorials</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Supports')}</a>
                </div>
            </div>

            <div>
                <h3 class="text-sm font-bold  ">{t('Jobs by streams')}</h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Startups')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Enterprise')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Government')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Saas')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Marketplaces')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Ecommerce')}</a>
                </div>
            </div>

           

          
        </div>
        
        <hr class="my-6 border-gray-200 md:my-10 dark:border-gray-700"/>
        <div>
                <h3 class="text-sm font-bold  ">{t('About us')}</h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Startups')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Enterprise')}</a>
                 
                </div>
            </div>
        <div>
                <h3 class="text-sm font-bold  ">{t('Team diary')}</h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Startups')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Enterprise')}</a>
                 
                </div>
            </div>
        <div>
                <h3 class="text-sm font-bold  ">{t('Terms and conditions')}</h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Startups')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Enterprise')}</a>
                 
                </div>
            </div>
        <div>
                <h3 class="text-sm font-bold  ">{t('sitemap')} </h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('Startups')}</a>
            
                 
                </div>
            </div>
        <div class="flex flex-col items-center justify-between sm:flex-row">
          <p className='border-white' >
          <i class="bi bi-google-play text-black"></i>  {t('Get Android App')}
          </p>
          <div class="social-icons">
  <i class="fab fa-facebook"></i>
  <i class="fab fa-twitter"></i>
  <i class="fab fa-instagram"></i>

</div>
            <p class="mt-4 text-sm  sm:mt-0 dark">{t('© Copyright 2023. All Rights Reserved.')}</p>
        </div>
    </div>
</footer>

    </div>
  )
}

export default Footer
