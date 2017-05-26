export default {
  'formTemplate': {
    // Ignore for now
  },
  'formElements': [
    {
      'name': 'targetOrg',
      'label': 'Application To',
      'help': 'Select the target regional or district council which is appropriate',
      'type': 'select',
      'options': [
        { 'value': 1, 'label': 'Marlborough District Council' },
        { 'value': 4, 'label': 'Otago Regional Council' },
        { 'value': 5, 'label': 'Queenstown Lakes District Council' }
      ],
      'repeatable': false
    },
    {
      'name': 'agentOrApplicant',
      'label': 'Are you an...',
      'type': 'radio',
      'default': {
        'val': 1
      },
      'options': [
        { 'value': 1, 'label': 'Applicant' },
        { 'value': 2, 'label': 'Agent' }
      ],
      'repeatable': true
    },
    {
      'name': 'councilRefAllocated',
      'label': 'Has a council reference been allocated?',
      'type': 'radio',
      'options': [
        { 'value': true, 'label': 'Yes' },
        { 'value': false, 'label': 'No' }
      ],
      'repeatable': false
    },
    {
      'name': 'refNumber',
      'label': 'Reference number',
      'type': 'text',
      'repeatable': false,
      'conditions': [
        { 'name': 'councilRefAllocated', 'value': true }
      ]
    },
    {
      'name': 'affectedParties',
      'label': 'Affected Parties',
      'type': 'text',
      'repeatable': true
    },
    // {
    //   'name': 'affectedAreas',
    //   'label': 'Which area is affected?',
    //   'type': 'radio',
    //   'default': {
    //     val: 1
    //   },
    //   'options': [
    //     { 'value': 1, 'label': 'Coastal' },
    //     { 'value': 2, 'label': 'Forest' },
    //     { 'value': 3, 'label': 'Lakes' },
    //     { 'value': 4, 'label': 'Plains' }
    //   ],
    //   'repeatable': true
    // },
    // {
    //   'name': 'applications',
    //   'type': 'section',
    //   'repeatable': true,
    //   'formElements': [
    //     {
    //       'name': 'applicantType',
    //       'label': 'Type',
    //       'type': 'radio',
    //       'default': {val: 1},
    //       'options': [
    //         { 'value': 1, 'label': 'Individual' },
    //         { 'value': 2, 'label': 'Company' },
    //         { 'value': 3, 'label': 'Trust' }
    //       ]
    //     },
    //     {
    //       'name': 'individual',
    //       'type': 'section',
    //       'conditions': [{
    //         'name': 'applicantType', 'value': 1
    //       }],
    //       'formElements': [
    //         {
    //           'name': 'firstName',
    //           'label': 'First name(s)',
    //           'help': 'Some help text',
    //           'type': 'text'
    //         },
    //         {
    //           'name': 'lastName',
    //           'label': 'Last Name',
    //           'type': 'text'
    //         }
    //       ]
    //     },
    //     {
    //       'name': 'company',
    //       'type': 'section',
    //       'conditions': [{ 'name': 'applicantType', 'value': 2 }],
    //       'formElements': [
    //         {
    //           'name': 'companyName',
    //           'label': 'Company Name',
    //           'help': 'Some help text',
    //           'type': 'text'
    //         },
    //         {
    //           'name': 'companyNumber',
    //           'label': 'Registered Company Number',
    //           'type': 'text'
    //         }
    //       ]
    //     },
    //     {
    //       'name': 'trust',
    //       'type': 'section',
    //       'conditions': [{ 'name': 'applicantType', 'value': 3 }],
    //       'formElements': [
    //         {
    //           'name': 'trustName',
    //           'label': 'Trust Name',
    //           'help': 'Some help text',
    //           'type': 'text'
    //         },
    //         {
    //           'name': 'trustNumber',
    //           'label': 'Registered Trust Number',
    //           'type': 'text'
    //         }
    //       ]
    //     }
    //   ]
    // }
  ],

  'state': {
      targetOrg: [
        {
          id: 1234,
          val: 4
        }
      ],
      agentOrApplicant: [
        { val: 1 }
      ],
      // councilRefAllocated: [
      //   { val: false }
      // ],
      // affectedParties: [
      //   {
      //     val: 'Peter',
      //     errors: [{
      //       message: 'Name must be longer than 5 characters',
      //       code: 'TOOSHORT'
      //     }]
      //   },
      //   { val: 'Michael' }
      // ],
      // applications: [
      //   {
      //     errors: [{
      //       message: 'Must enter at least one applicant'
      //     }],
      //     val: {
      //       applicantType: [{
      //         val: 1
      //       }],
      //       individual: [{
      //         val: {
      //           firstName: [{
      //             val: 'Peter'
      //           }]
      //         }
      //       }]
      //     },
      //   }
      // ]
  }
}
