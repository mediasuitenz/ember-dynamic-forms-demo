// https://wireframepro.mockflow.com/view/Resource_Consent_Application#/page/D9541d0dbdbab515b00f4dadbb93131b6
export default {
  'formTemplate': {
    // Ignore for now
  },
  'components': [
    {
      'type': 'information',
      'markup': '<h2>Application for Resource Consent</h2><p>This is some text about resource consents'
    },
    {
      'name': 'agentOrApplicant',
      'label': 'Are you an:',
      'type': 'radio',
      'options': [
        {'value': 1, 'label': 'Applicant applying for Resource Consent'},
        {'value': 2, 'label': 'Agent applying on behalf of an applicant for Resource Consent'}
      ],
      'repeatable': false
    },
    {
      'name': 'applicationWrapper',
      'type': 'section',
      'components': [
        {
          'type': 'information',
          'markup': '<h2>Application</h2>'
        },
        {
          'name': 'applications',
          'type': 'section',
          'repeatable': true,
          components: [
            {
              'name': 'applicantTypeApplicant',
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
                'name': 'applicantTypeApplicant', 'value': 1
              }],
              'components': [
                {
                  'name': 'firstName',
                  'label': 'First name(s)',
                  'help': 'Some help text',
                  'type': 'text',
                  'default': {
                    func: 'getFirstName',
                    execute: 'first-only'
                  },
                },
                {
                  'name': 'lastName',
                  'label': 'Last Name',
                  'type': 'text',
                  'default': {
                    func: 'getLastName',
                    execute: 'first-only'
                  },
                }
              ]
            },
            {
              'name': 'company',
              'type': 'section',
              'conditions': [{ 'name': 'applicantTypeApplicant', 'value': 2 }],
              'components': [
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
              'conditions': [{ 'name': 'applicantTypeApplicant', 'value': 3 }],
              'components': [
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
            }
          ]
        }
      ]
    },
    {
      'name': 'agentWrapper',
      'type': 'section',
      'conditions': [{'name': 'agentOrApplicant', 'value': 2}],
      'components': [
        {
          'type': 'information',
          'markup': '<h2>Agent</h2>'
        },
        {
          'name': 'agents',
          'type': 'section',
          'repeatable': true,
          'components': [
            {
              'name': 'applicantTypeAgent',
              'label': 'Type',
              'type': 'radio',
              'default': { val: [1] },
              'options': [
                { 'value': 1, 'label': 'Individual' },
                { 'value': 2, 'label': 'Company' },
              ]
            },
            {
              'name': 'individual',
              'type': 'section',
              'conditions': [{
                'name': 'applicantTypeAgent', 'value': 1
              }],
              'components': [
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
              'conditions': [{ 'name': 'applicantTypeAgent', 'value': 2 }],
              'components': [
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
            }
          ]
        }
      ]
    }
  ],

  'state': {
    agentOrApplicant: [1]
  }
}
