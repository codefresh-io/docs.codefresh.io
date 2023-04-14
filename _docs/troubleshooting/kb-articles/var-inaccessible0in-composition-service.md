# A variable is inaccessible in a Composition or Service

#

## Overview

A variable is inaccessible when called from a Composition

## Details

A variable has to be added to your Composition's Environment.

In your Environments settings, you will need to call the Codefresh variable.

    
    
    services:
      name: yourservice
      composition:
        yourservicename:
          image: yourserviceimage
          ports:
            - 5432
      composition_variables:
         - 'CFVARIABLENAME=${{CFVARIABLENAME}}'
    

_Notes_

In both setup and readiness Service steps, Codefresh exported variables are
accessible by default.

