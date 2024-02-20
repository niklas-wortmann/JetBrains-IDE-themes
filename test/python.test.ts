import { expect, it } from 'vitest';
import { getJetBrainsHighlighter } from './util/jetbrains-themed-instance';
import { codeToHtml } from 'shiki';

it('renders python properly in dark theme', async () => {
    const shiki = await getJetBrainsHighlighter();
    const out = await shiki.codeToHtml(
        `
import os
import re
import jwt


def auth_token_decode(auth_token):
    """
    Checks whether JWT Token is valid or not.
    If valid returns True else False
    """
    try:
        jwt.decode(auth_token, os.environ['SECRET_KEY'], algorithms=["HS256"])
        return True
    except jwt.ExpiredSignatureError:
        return False
    except jwt.InvalidSignatureError:
        return False
    except jwt.InvalidTokenError:
        return False



def lambda_handler(event, context):
    token = event['authorizationToken']  # retrieve the Auth token

    principal_id = 'abc123'  # fake

    policy = create_policy(event['methodArn'], principal_id)

    if event['authorizationToken']:
        user_info = auth_token_decode(token)
        if user_info:
            policy.allowAllMethods()
        else:
            policy.denyAllMethods()
    else:
        policy.denyAllMethods()

    return policy.build()


def create_policy(method_arn, principal_id):
    tmp = method_arn.split(':')
    region = tmp[3]
    account_id = tmp[4]
    api_id, stage = tmp[5].split('/')[:2]

    policy = AuthPolicy(principal_id, account_id)
    policy.restApiId = api_id
    policy.region = region
    policy.stage = stage

    return policy


class HttpVerb:
    GET = 'GET'
    POST = 'POST'
    PUT = 'PUT'
    PATCH = 'PATCH'
    HEAD = 'HEAD'
    DELETE = 'DELETE'
    OPTIONS = 'OPTIONS'
    ALL = '*'


class AuthPolicy(object):
    # The AWS account id the policy will be generated for. This is used to create the method ARNs.
    awsAccountId = ''
    # The principal used for the policy, this should be a unique identifier for the end user.
    principalId = ''
    # The policy version used for the evaluation. This should always be '2012-10-17'
    version = '2012-10-17'
    # The regular expression used to validate resource paths for the policy
    pathRegex = '^[/.a-zA-Z0-9-\\*]+$'

    '''Internal lists of allowed and denied methods.

    These are lists of objects and each object has 2 properties: A resource
    ARN and a nullable conditions statement. The build method processes these
    lists and generates the approriate statements for the final policy.
    '''
    allowMethods = []
    denyMethods = []

    # The API Gateway API id. By default this is set to '*'
    restApiId = '*'
    # The region where the API is deployed. By default this is set to '*'
    region = '*'
    # The name of the stage used in the policy. By default this is set to '*'
    stage = '*'

    def __init__(self, principal, awsAccountId):
        self.awsAccountId = awsAccountId
        self.principalId = principal
        self.allowMethods = []
        self.denyMethods = []
        
`,
        { theme: 'Jetbrains Dark Theme', lang: 'python' }
    );

    expect(out).toMatchFileSnapshot('./out/python.html');
});
