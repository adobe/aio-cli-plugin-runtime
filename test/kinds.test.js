/*
Copyright 2020 Adobe Inc. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const kinds = require('../src/kinds')

describe('fileExtensionForKind', () => {
  test('map action kind to file extension', () => {
    expect(kinds.fileExtensionForKind('ballerina:abc')).toEqual('.bal')
    expect(kinds.fileExtensionForKind('dotnet:abc')).toEqual('.cs')
    expect(kinds.fileExtensionForKind('go:abc')).toEqual('.go')
    expect(kinds.fileExtensionForKind('java:abc')).toEqual('.java')
    expect(kinds.fileExtensionForKind('nodejs:abc')).toEqual('.js')
    expect(kinds.fileExtensionForKind('php:abc')).toEqual('.php')
    expect(kinds.fileExtensionForKind('python:abc')).toEqual('.py')
    expect(kinds.fileExtensionForKind('ruby:abc')).toEqual('.rb')
    expect(kinds.fileExtensionForKind('rust:abc')).toEqual('.rs')
    expect(kinds.fileExtensionForKind('swift:abc')).toEqual('.swift')

    // all kinds are colon separated but test defensively anyway
    expect(kinds.fileExtensionForKind('swift')).toEqual('.swift')

    // unknown kinds return ''
    expect(kinds.fileExtensionForKind('???:???')).toEqual('')
    expect(kinds.fileExtensionForKind('???')).toEqual('')
    expect(kinds.fileExtensionForKind('')).toEqual('')
    expect(kinds.fileExtensionForKind(undefined)).toEqual('')
  })
})

describe('kindForFileExtension', () => {
  test('map action kind to file extension', () => {
    expect(kinds.kindForFileExtension('f.bal')).toEqual('ballerina:default')
    expect(kinds.kindForFileExtension('f.cs')).toEqual('dotnet:default')
    expect(kinds.kindForFileExtension('f.go')).toEqual('go:default')
    expect(kinds.kindForFileExtension('f.java')).toEqual('java:default')
    expect(kinds.kindForFileExtension('f.js')).toEqual('nodejs:default')
    expect(kinds.kindForFileExtension('f.php')).toEqual('php:default')
    expect(kinds.kindForFileExtension('f.py')).toEqual('python:default')
    expect(kinds.kindForFileExtension('f.rb')).toEqual('ruby:default')
    expect(kinds.kindForFileExtension('f.rs')).toEqual('rust:default')
    expect(kinds.kindForFileExtension('f.swift')).toEqual('swift:default')

    expect(kinds.kindForFileExtension(undefined)).toEqual(undefined)
    expect(kinds.kindForFileExtension('')).toEqual(undefined)
    expect(kinds.kindForFileExtension('.')).toEqual(undefined)
    expect(kinds.kindForFileExtension('.js')).toEqual(undefined)
    expect(kinds.kindForFileExtension('???')).toEqual(undefined)
  })
})