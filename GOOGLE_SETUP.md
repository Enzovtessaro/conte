# Google Search Console & Analytics Setup

## 📊 Google Search Console Implementation

### 1. Google Search Console Setup

1. **Access Google Search Console**: https://search.google.com/search-console
2. **Add Property**: Add `https://sejaconte.com.br` as a new property
3. **Verify Ownership**: Choose "HTML tag" method
4. **Copy Verification Code**: Copy the content value from the meta tag
5. **Update index.html**: Replace `YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE` with your actual code

### 2. Google Analytics 4 Setup

1. **Access Google Analytics**: https://analytics.google.com
2. **Create Property**: Create a new GA4 property for `sejaconte.com.br`
3. **Get Measurement ID**: Copy your GA4 Measurement ID (format: G-XXXXXXXXXX)
4. **Update index.html**: Replace `GA_MEASUREMENT_ID` with your actual ID

### 3. Google Tag Manager Setup (Optional but Recommended)

1. **Access Google Tag Manager**: https://tagmanager.google.com
2. **Create Container**: Create a new container for your website
3. **Get Container ID**: Copy your GTM Container ID (format: GTM-XXXXXXX)
4. **Update index.html**: Replace `GTM-XXXXXXX` with your actual ID

## 🔧 Implementation Details

The following tracking codes have been added to `index.html`:

### Google Search Console Verification
```html
<meta name="google-site-verification" content="YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE" />
```

### Google Analytics 4
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Tag Manager
```html
<!-- In <head> -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>

<!-- In <body> -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

## 📈 Benefits

- **Search Console**: Monitor search performance, indexing status, and SEO issues
- **Google Analytics**: Track user behavior, conversions, and website performance
- **Tag Manager**: Manage all tracking codes from one place

## 🚀 Next Steps

1. Replace placeholder values with actual IDs
2. Deploy changes to production
3. Verify tracking is working in Google Search Console
4. Set up goals and conversions in Google Analytics
5. Monitor performance and optimize based on data

## 🔍 Verification

After deployment, verify tracking is working:
- **Search Console**: Check verification status
- **Analytics**: Check real-time reports
- **Tag Manager**: Use Preview mode to test tags
