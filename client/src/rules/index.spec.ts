import {
  Rule_Required,
  Rule_OnlyText,
  Rule_WithoutSpaces,
  Rule_Mail,
  Rule_Phone,
  Rule_MinLength
} from './';

describe('Rules test', () => {
  describe('Rule_Required()', () => {
    it('Success tests', () => {
      expect(Rule_Required.required).toEqual({
        value: true,
        message: 'rules.required'
      });
    });
  });

  describe('Rule_OnlyText()', () => {
    it('Success tests', () => {
      expect(Rule_OnlyText.validate.formatText('')).toBeUndefined();
      expect(Rule_OnlyText.validate.formatText('Ro')).toBeUndefined();
      expect(
        Rule_OnlyText.validate.formatText('Test with Jest')
      ).toBeUndefined();
    });

    it('Failed tests', () => {
      expect(Rule_OnlyText.validate.formatText('Ro ')).toEqual(
        'rules.invalidText'
      );
      expect(Rule_OnlyText.validate.formatText('Ro G.')).toEqual(
        'rules.invalidText'
      );
      expect(Rule_OnlyText.validate.formatText('Pedro4')).toEqual(
        'rules.invalidText'
      );
      expect(Rule_OnlyText.validate.formatText(0 as any)).toEqual(
        'rules.invalidText'
      );
      expect(Rule_OnlyText.validate.formatText(undefined as any)).toEqual(
        'rules.invalidText'
      );
      expect(Rule_OnlyText.validate.formatText(null as any)).toEqual(
        'rules.invalidText'
      );
    });
  });

  describe('Rule_WithoutSpaces()', () => {
    it('Success tests', () => {
      expect(
        Rule_WithoutSpaces.validate.formatTextWithoutSpaces('')
      ).toBeUndefined();
      expect(
        Rule_WithoutSpaces.validate.formatTextWithoutSpaces('Ro')
      ).toBeUndefined();
      expect(
        Rule_WithoutSpaces.validate.formatTextWithoutSpaces(0 as any)
      ).toBeUndefined();
      expect(
        Rule_WithoutSpaces.validate.formatTextWithoutSpaces(undefined as any)
      ).toBeUndefined();
      expect(
        Rule_WithoutSpaces.validate.formatTextWithoutSpaces(null as any)
      ).toBeUndefined();
    });

    it('Failed tests', () => {
      expect(
        Rule_WithoutSpaces.validate.formatTextWithoutSpaces('Rodrigo ')
      ).toEqual('rules.invalidText');
      expect(
        Rule_WithoutSpaces.validate.formatTextWithoutSpaces('Rodrigo G. S.')
      ).toEqual('rules.invalidText');
    });
  });

  describe('Rule_Mail()', () => {
    it('Success tests', () => {
      expect(Rule_Mail.validate.formatMail('')).toBeUndefined();
      expect(
        Rule_Mail.validate.formatMail('r.garez29@gmail.com')
      ).toBeUndefined();
      expect(
        Rule_Mail.validate.formatMail('_gam0629@miempresa.com.mx')
      ).toBeUndefined();
      expect(
        Rule_Mail.validate.formatMail('micorreo@micorreo.co')
      ).toBeUndefined();
      expect(
        Rule_Mail.validate.formatMail('micorreo#23cor@micorreo')
      ).toBeUndefined();
    });

    it('Failed tests', () => {
      expect(Rule_Mail.validate.formatMail(' ')).toEqual('rules.invalidMail');
      expect(Rule_Mail.validate.formatMail('micorreo')).toEqual(
        'rules.invalidMail'
      );
      expect(Rule_Mail.validate.formatMail('micorreo@micorreo.')).toEqual(
        'rules.invalidMail'
      );
      expect(Rule_Mail.validate.formatMail('micorreo@micorreo.com.')).toEqual(
        'rules.invalidMail'
      );
      expect(Rule_Mail.validate.formatMail('micorreo@micorreo.com.f')).toEqual(
        'rules.invalidMail'
      );
      expect(Rule_Mail.validate.formatMail('@')).toEqual('rules.invalidMail');
      expect(Rule_Mail.validate.formatMail(0 as any)).toEqual(
        'rules.invalidMail'
      );
      expect(Rule_Mail.validate.formatMail(undefined as any)).toEqual(
        'rules.invalidMail'
      );
      expect(Rule_Mail.validate.formatMail(null as any)).toEqual(
        'rules.invalidMail'
      );
    });
  });

  describe('Rule_Phone()', () => {
    it('Success tests', () => {
      expect(Rule_Phone.validate.formatPhone('')).toBeUndefined();
      expect(Rule_Phone.validate.formatPhone('5539607325')).toBeUndefined();
      expect(Rule_Phone.validate.formatPhone('0152902800')).toBeUndefined();
    });

    it('Failed tests', () => {
      expect(Rule_Phone.validate.formatPhone('55396073251505100051')).toEqual(
        'rules.invalidPhone'
      );
      expect(Rule_Phone.validate.formatPhone('553960732')).toEqual(
        'rules.invalidPhone'
      );
      expect(Rule_Phone.validate.formatPhone('0')).toEqual(
        'rules.invalidPhone'
      );
      expect(Rule_Phone.validate.formatPhone('Pedro4')).toEqual(
        'rules.invalidPhone'
      );
      expect(Rule_Phone.validate.formatPhone(0 as any)).toEqual(
        'rules.invalidPhone'
      );
      expect(Rule_Phone.validate.formatPhone(undefined as any)).toEqual(
        'rules.invalidPhone'
      );
      expect(Rule_Phone.validate.formatPhone(null as any)).toEqual(
        'rules.invalidPhone'
      );
    });
  });

  describe('Rule_MinLength()', () => {
    it('Success tests', () => {
      expect(
        Rule_MinLength(3).validate.formatMinLength('55396')
      ).toBeUndefined();
      expect(
        Rule_MinLength(8).validate.formatMinLength('5539607325')
      ).toBeUndefined();
      expect(
        Rule_MinLength(4).validate.formatMinLength('01529028')
      ).toBeUndefined();
    });

    it('Failed tests', () => {
      expect(Rule_MinLength(3).validate.formatMinLength('10')).toEqual(
        'rules.invalidMinLenght3'
      );
      expect(Rule_MinLength(8).validate.formatMinLength('553960')).toEqual(
        'rules.invalidMinLenght8'
      );
      expect(Rule_MinLength(2).validate.formatMinLength('0')).toEqual(
        'rules.invalidMinLenght'
      );
    });
  });
});
