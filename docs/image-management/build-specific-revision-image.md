---
layout: docs
title: "Build specific revision image"
description: ""
group: image-management
redirect_from:
  - /docs/build-specific-revision-image
  - /docs/build-specific-revision-image
toc: true
---
We added a simple way to build an image from specific revision, auto-tagged we SHA.

## Why is that important?
In order to discover and solve regression issues, it can be helpful to return to a specific revision in our repository, than test in with same images of other micro-services as part of a composition.
That process can be done easily, and can help you improve your delivery and quality.

## How to build and tag your revision?

{:.text-secondary}
### **Select your Repository**

{% include image.html 
lightbox="true" 
file="/images/3bb6ce5-2017-04-06_1413.png" 
url="/images/3bb6ce5-2017-04-06_1413.png" 
alt="2017-04-06_1413" 
max-width="40%" 
caption="Click on requested repository"
%}

{:.text-secondary} 
### **Go to Branches**

{% include image.html 
lightbox="true" 
file="/images/71995c0-2017-04-06_1417.png" 
url="/images/71995c0-2017-04-06_1417.png"
alt="2017-04-06_1417" 
max-width="40%" 
%}

{:.text-secondary}  
### **Select a branch from list**

{% include image.html 
lightbox="true" 
file="/images/d18cb69-2017-04-06_1421.png" 
url="/images/d18cb69-2017-04-06_1421.png"
alt="2017-04-06_1421" 
max-width="40%" 
%}

{:.text-secondary}  
### **Select a commit from list**

{% include image.html 
lightbox="true" 
file="/images/e142dc2-2017-04-06_1423.png" 
url="/images/e142dc2-2017-04-06_1423.png"
alt="2017-04-06_1423" 
max-width="40%" 
%}

{:.text-secondary} 
### **Choose your preferred pipeline and build**

{% include image.html 
lightbox="true" 
file="/images/98b5b7e-2017-04-06_1425.png" 
url="/images/98b5b7e-2017-04-06_1425.png"
alt="2017-04-06_1425" 
max-width="40%" 
%}
 
{:.text-secondary}  
### **Choose your preferred pipeline and build**
You can choose a different pipeline than the default pipeline of the repository.

{% include image.html 
lightbox="true" 
file="/images/c1d1807-2017-04-06_1426.png" 
url="/images/c1d1807-2017-04-06_1426.png"
alt="2017-04-06_1426" 
max-width="40%" 
%}

Now, you can find your image on the images list.
Notice that your image is already tagged with the SHA of the revision, so you can easily run a composition using that tag.

{% include image.html 
lightbox="true" 
file="/images/44c140c-2017-04-06_1441.png" 
url="/images/44c140c-2017-04-06_1441.png"
alt="2017-04-06_1441" 
max-width="40%" 
%}

Now you can run a composition using the SHA tag image as part of the micro-services inside.
Don't forget to launch your composition.

{% include image.html 
lightbox="true" 
file="/images/5742607-2017-04-06_1459.png" 
url="/images/5742607-2017-04-06_1459.png"
alt="2017-04-06_1459" 
max-width="40%" 
%}
