import {
  AddAuthRequest,
  CognitoUserAliasAttributes,
  CognitoUserPoolSigninMethod,
  CognitoUserProperty,
  UpdateAuthRequest,
} from 'amplify-headless-interface';
import {
  getAddAuthRequestAdaptor,
  getUpdateAuthRequestAdaptor,
} from '../../../../provider-utils/awscloudformation/utils/auth-request-adaptors';
import { FeatureFlags } from 'amplify-cli-core';

describe('get add auth request adaptor', () => {
  beforeEach(() => {
    FeatureFlags.getBoolean = () => false;
  });
  describe('valid translations', () => {
    it('translates request with minimal user pool config only', () => {
      const addAuthRequest: AddAuthRequest = {
        version: 2,
        resourceName: 'myTestAuth',
        serviceConfiguration: {
          serviceName: 'Cognito',
          userPoolConfiguration: {
            signinMethod: CognitoUserPoolSigninMethod.EMAIL,
            requiredSignupAttributes: [CognitoUserProperty.EMAIL],
          },
          includeIdentityPool: false,
        },
      };

      expect(getAddAuthRequestAdaptor('javascript')(addAuthRequest)).toMatchSnapshot();
    });
  });
  it('translates request with aliasAttributes', () => {
    FeatureFlags.getBoolean = () => true;
    const addAuthRequest: AddAuthRequest = {
      version: 2,
      resourceName: 'myTestAuth',
      serviceConfiguration: {
        serviceName: 'Cognito',
        userPoolConfiguration: {
          signinMethod: CognitoUserPoolSigninMethod.EMAIL,
          requiredSignupAttributes: [CognitoUserProperty.EMAIL],
          aliasAttributes: [
            CognitoUserAliasAttributes.EMAIL,
            CognitoUserAliasAttributes.PHONE_NUMBER,
            CognitoUserAliasAttributes.PREFERRED_USERNAME,
          ],
        },
        includeIdentityPool: false,
      },
    };

    expect(getAddAuthRequestAdaptor('javascript')(addAuthRequest)).toMatchSnapshot();
  });
  it('translates request without aliasAttributes', () => {
    FeatureFlags.getBoolean = () => true;
    const addAuthRequest: AddAuthRequest = {
      version: 2,
      resourceName: 'myTestAuth',
      serviceConfiguration: {
        serviceName: 'Cognito',
        userPoolConfiguration: {
          signinMethod: CognitoUserPoolSigninMethod.EMAIL,
          requiredSignupAttributes: [CognitoUserProperty.EMAIL],
          aliasAttributes: [
            CognitoUserAliasAttributes.EMAIL,
            CognitoUserAliasAttributes.PHONE_NUMBER,
            CognitoUserAliasAttributes.PREFERRED_USERNAME,
          ],
        },
        includeIdentityPool: false,
      },
    };

    expect(getAddAuthRequestAdaptor('javascript')(addAuthRequest)).toMatchSnapshot();
  });

  it('translates request with autoVerifiedAttributes', () => {
    FeatureFlags.getBoolean = () => true;
    const addAuthRequest: AddAuthRequest = {
      version: 2,
      resourceName: 'myTestAuth',
      serviceConfiguration: {
        serviceName: 'Cognito',
        includeIdentityPool: false,
        userPoolConfiguration: {
          signinMethod: CognitoUserPoolSigninMethod.EMAIL,
          requiredSignupAttributes: [CognitoUserProperty.EMAIL],
          autoVerifiedAttributes: [
            {
              type: 'EMAIL',
              verificationMessage: 'test email verificaiton message {####}',
              verificationSubject: 'test email verification subject',
            },
            {
              type: 'PHONE_NUMBER',
              verificationMessage: 'test sms verification message {####}',
            },
          ],
        },
      },
    };

    expect(getAddAuthRequestAdaptor('javascript')(addAuthRequest)).toMatchSnapshot();
  });
});

describe('get update auth request adaptor', () => {
  describe('valid translations', () => {
    it('translates empty oAuth config into hostedUI: false', () => {
      const updateAuthRequest: UpdateAuthRequest = {
        version: 2,
        serviceModification: {
          serviceName: 'Cognito',
          userPoolModification: {
            oAuth: {},
          },
          includeIdentityPool: false,
        },
      };

      expect(getUpdateAuthRequestAdaptor('javascript', ['required_attribute'])(updateAuthRequest)).toMatchSnapshot();
    });
  });
});
