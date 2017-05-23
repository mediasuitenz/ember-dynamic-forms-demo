// https://wireframepro.mockflow.com/view/Resource_Consent_Application#/page/D9541d0dbdbab515b00f4dadbb93131b6
export default {
  'formTemplate': {
    // Ignore for now
  },
  'formElements': [
    {
      'type': 'information',
      'markup': '<h2>Property Details</h2>'
    },
    {
      'name': 'siteWrapper',
      'type': 'section',
      'formElements': [
        {
          'type': 'information',
          'markup': '<p>The site at which the proposed activity is due to occur</p>'
        },
        {
          'name': 'streetAddress',
          'label': 'Street Address',
          'type': 'text'
        },
        {
          'name': 'legalDescription',
          'label': 'Legal Description',
          'type': 'text'
        }
      ]
    },
    {
      'name': 'enterLocale',
      'label': 'I want to enter the locale of the site',
      'type': 'checkbox'
    },
    {
      'name': 'locale',
      'type': 'section',
      'conditions': [{ name: 'enterLocale', value: true }],
      'formElements': [
        {
          'type': 'information',
          'markup': '<h3>Locale</h3>'
        },
        {
          'name': 'bayName',
          'label': 'Bay name',
          'type': 'text'
        },
        {
          'name': 'riverName',
          'label': 'River name',
          'type': 'text'
        },
        {
          'name': 'roadName',
          'label': 'Road name',
          'type': 'text'
        },
        {
          'type': 'information',
          'markup': '<h3>Proximity to well-known landmarks</h3>'
        },
        {
          'name': 'gridReference',
          'label': 'Grid Reference',
          'type': 'grid-reference'
        },
        {
          'name': 'characteristics',
          'label': 'Natural and physical characteristics',
          'type': 'text-area'
        },
      ]
    },
    {
      'name': 'ownersAndOccupiers',
      'type': 'section',
      'formElements': [
        {
          'type': 'information',
          'markup': '<h3>Owners and Occupiers</h3>'
        },
        {
          'name': 'soleOccupier',
          'label': 'Applicant is the only owner and occupier',
          'type': 'radio',
          'options': [
            {'value': true, 'label': 'Yes'},
            {'value': false, 'label': 'No'}
          ],
        },
        {
          'name': 'additionalOwnersOccupier',
          'type': 'section',
          'repeatable': true,
          'conditions': [{name: 'soleOccupier', value: false}],
          'formElements': [
            {
              'name': 'ownerOrOccupier',
              'label': 'Are the below:',
              'type': 'radio',
              'default': { val: [1] },
              'options': [
                { 'value': 'owner', 'label': 'Owner' },
                { 'value': 'occupier', 'label': 'Occupier' }
              ],
            },
            {
              'name': 'ownerOccupierType',
              'label': 'Type',
              'type': 'radio',
              'default': { val: [1] },
              'options': [
                { 'value': 1, 'label': 'Individual' },
                { 'value': 2, 'label': 'Company' },
                { 'value': 3, 'label': 'Trust' }
              ]
            },
            {
              'name': 'individual',
              'type': 'section',
              'conditions': [{
                'name': 'ownerOccupierType', 'value': 1
              }],
              'formElements': [
                {
                  'name': 'firstName',
                  'label': 'First name(s)',
                  'help': 'Some help text',
                  'type': 'text'
                },
                {
                  'name': 'lastName',
                  'label': 'Last Name',
                  'type': 'text'
                }
              ]
            },
            {
              'name': 'company',
              'type': 'section',
              'conditions': [{ 'name': 'ownerOccupierType', 'value': 2 }],
              'formElements': [
                {
                  'name': 'companyName',
                  'label': 'Company Name',
                  'help': 'Some help text',
                  'type': 'text'
                },
                {
                  'name': 'companyNumber',
                  'label': 'Registered Company Number',
                  'type': 'text'
                }
              ]
            },
            {
              'name': 'trust',
              'type': 'section',
              'conditions': [{ 'name': 'ownerOccupierType', 'value': 3 }],
              'formElements': [
                {
                  'name': 'trustName',
                  'label': 'Trust Name',
                  'help': 'Some help text',
                  'type': 'text'
                },
                {
                  'name': 'trustNumber',
                  'label': 'Registered Trust Number',
                  'type': 'text'
                }
              ]
            },
            {
              'name': 'contactAddress',
              'label': 'Contact Address (postal):',
              'type': 'text'
            }
          ]
        }
      ]
    }
  ],

  'state': {
  }
}
